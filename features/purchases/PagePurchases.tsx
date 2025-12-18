"use client";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Upload } from "lucide-react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createPurchaseByDay,
  PurchasesTypeData,
} from "@/app/actions/purchases/purchasesAction";
import { toast } from "sonner";
import { defaultValuesPurchase, PurchaseType, schemaPurchase } from "./schema";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormWrapperWithDate from "@/components/wrapper/FormWrapper";
import FieldForm from "@/components/input/FieldForm";
import ViewUploadedFoto from "./ViewUploadedFoto";
import { uploadToImgBB } from "@/app/actions/uploadedImgBB/upload-imgbb";
import { createUrlPhotoByDay } from "@/app/actions/url-photo/urlAction";

export default function PagePurchases({
  data,
  day,
  month,
  year,
}: {
  data?: PurchasesTypeData["days"][number];
  day?: number;
  month: number;
  year: number;
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<PurchaseType>({
    resolver: yupResolver(schemaPurchase) as any,
    defaultValues: defaultValuesPurchase,
  });

  const purchase = useWatch({ control: form.control, name: "purchase" });
  const fuel = useWatch({ control: form.control, name: "fuel" });
  const cleaning = useWatch({ control: form.control, name: "cleaning" });
  const payment = useWatch({ control: form.control, name: "payment" });
  const total = +purchase + +fuel + +cleaning + +payment;

  const MAX_SIZE = 5000 * 1024;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const invalid = files.filter((f) => f.size > MAX_SIZE);
    if (invalid.length) {
      toast.error("Фото должно быть не больше 5мб");
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const onSubmit: SubmitHandler<PurchaseType> = async (data) => {
    try {
      if (selectedFiles.length > 0) {
        const photoUrls = await uploadToImgBB(selectedFiles);
        await createUrlPhotoByDay({
          day: data.date.getDate(),
          month: data.date.getMonth() + 1,
          year: data.date.getFullYear(),
          urls: photoUrls,
        });
        toast.success(`Загружено ${photoUrls.length} фото`);
      }

      await createPurchaseByDay({
        day: data.date.getDate(),
        month: data.date.getMonth() + 1,
        year: data.date.getFullYear(),
        purchase: data.purchase,
        fuel: data.fuel,
        cleaning: data.cleaning,
        payment: data.payment,
      });

      toast.success("Данные сохранены");
      setSelectedFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Ошибка загрузки фото");
    }
  };
  useEffect(() => {
    if (!data || !day || !month || !year) return;

    form.reset({
      date: new Date(year, month - 1, day),
      purchase: data.purchase,
      fuel: data.fuel,
      cleaning: data.cleaning,
      payment: data.payment,
    });
  }, [data]);

  return (
    <FormWrapperWithDate onSubmit={onSubmit} form={form} disabledData={!!data}>
      <Label>
        <span className="mr-4">всего:</span>
        {total}
      </Label>

      <FieldSet className="flex flex-1 items-center justify-center">
        <FieldGroup>
          <FieldForm fieldLabel="закупка" fieldName="purchase" />

          <FieldForm fieldLabel="топливо" fieldName="fuel" />

          <FieldForm fieldLabel="хим-чистка" fieldName="cleaning" />

          <FieldForm fieldLabel="оплата" fieldName="payment" />

          <FieldLabel
            className="text-base text-blue-700 flex items-center gap-6"
            htmlFor="picture"
          >
            <Upload className="w-4 h-4" />
            фото чеков
          </FieldLabel>
          <Input
            id="picture"
            type="file"
            hidden
            multiple
            onChange={handleFileChange}
          />

          <ViewUploadedFoto
            data={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />
        </FieldGroup>
      </FieldSet>
    </FormWrapperWithDate>
  );
}
