"use client";
import { FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  Car,
  Droplets,
  Fuel,
  ReceiptText,
  Shirt,
  ShoppingBasket,
  Store,
  Upload,
} from "lucide-react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createPurchaseByDay,
  PurchasesTypeData,
} from "@/app/actions/purchases/purchasesAction";
import { toast } from "sonner";
import { defaultValuesPurchase, PurchaseType, schemaPurchase } from "./schema";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import FormWrapperWithDate from "@/components/wrapper/FormWrapper";
import FieldForm from "@/components/input/FieldForm";
import ViewUploadedFoto from "./ViewUploadedFoto";
import { uploadToImgBB } from "@/app/actions/uploadedImgBB/upload-imgbb";
import { createUrlPhotoByDay } from "@/app/actions/url-photo/urlAction";
import { resizeFileIfNeeded } from "@/utils/resizeFileImg";

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

  const [purchase = 0, fuel = 0, cleaning = 0, payment = 0] = useWatch({
    control: form.control,
    name: ["purchase", "fuel", "cleaning", "payment"],
  });

  const total = useMemo(
    () => Number(purchase) + Number(fuel) + Number(cleaning) + Number(payment),
    [purchase, fuel, cleaning, payment],
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedFiles.length > 2) return toast.error("Максимум 2 фото");

    const files = Array.from(e.target.files || []);
    const processedFiles = await Promise.all(files.map(resizeFileIfNeeded));
    setSelectedFiles((prev) => [...prev, ...processedFiles]);
  };

  const onSubmit: SubmitHandler<PurchaseType> = async (data) => {
    try {
      if (selectedFiles.length > 0) {
        const result = await uploadToImgBB(selectedFiles);

        if (!result.success) {
          toast.error(result.error);
          return;
        }

        const photoUrls = result.urls;
        await createUrlPhotoByDay({
          day: data.date.getDate(),
          month: data.date.getMonth() + 1,
          year: data.date.getFullYear(),
          urls: photoUrls as string[],
        });
        toast.success(`Загружено ${photoUrls?.length} фото`);
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
      <FieldSet className="flex flex-1  justify-start pt-4">
        <FieldGroup>
          <FieldLabel
            className="text-base text-blue-700 flex items-center justify-end  gap-6 px-3 mb-4 w-full"
            htmlFor="picture"
          >
            <Upload className="w-4 h-4" />
            фото
          </FieldLabel>
          <FieldForm
            icon={<ReceiptText className="w-5 h-5" />}
            label="закупка"
            fieldName="purchase"
          />
          <FieldForm
            icon={<Fuel className="w-5 h-5" />}
            label="топливо"
            fieldName="fuel"
          />
          <FieldForm
            icon={<Car className="w-5 h-5" />}
            label="мойка авто"
            fieldName="cleaning"
          />
          <FieldForm
            icon={<ShoppingBasket className="w-5 h-5" />}
            label="оплата"
            fieldName="payment"
          />
          <div className="flex items-center justify-end px-3 text-xs font-bold text-blue-600">
            {total}
          </div>

          <Input
            id="picture"
            type="file"
            hidden
            multiple
            accept="image/jpeg,image/png,image/webp"
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
