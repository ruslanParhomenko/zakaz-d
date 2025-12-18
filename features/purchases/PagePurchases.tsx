"use client";

import DatePickerInput from "@/components/input/DatePickerInput";
import NumericInput from "@/components/input/NumericInput";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { RefreshCcw, Trash2Icon, Upload, X } from "lucide-react";

import { FieldPath, SubmitHandler, useForm, useWatch } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  createPurchaseByDay,
  PurchasesTypeData,
} from "@/app/actions/purchases/purchasesAction";
import { toast } from "sonner";
import { defaultValuesPurchase, PurchaseType, schemaPurchase } from "./schema";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Input } from "@/components/ui/input";

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
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const form = useForm<PurchaseType>({
    resolver: yupResolver(schemaPurchase) as any,
    defaultValues: defaultValuesPurchase,
  });

  const purchase = useWatch({ control: form.control, name: "purchase" });
  const fuel = useWatch({ control: form.control, name: "fuel" });
  const cleaning = useWatch({ control: form.control, name: "cleaning" });
  const payment = useWatch({ control: form.control, name: "payment" });
  const total = +purchase + +fuel + +cleaning + +payment;

  const resetField = (nameField: FieldPath<PurchaseType>) => {
    form.resetField(nameField);
  };

  // Обработка выбора файлов
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Ограничение на размер файла (например, 5MB)
    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error("Некоторые файлы превышают 5MB");
      return;
    }

    setSelectedFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreviews((prev) => [...prev, ""]);
      }
    });
  };

  // Удаление файла
  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Загрузка файлов в Google Drive
  // const handlerUpload = async (files: File[], date: Date) => {
  //   if (files.length === 0) return [];

  //   setUploading(true);

  //   try {
  //     const formData = new FormData();
  //     files.forEach((file) => {
  //       formData.append("photos", file);
  //     });

  //     const year = date.getFullYear();
  //     const month = date.getMonth() + 1;
  //     const day = date.getDate();

  //     const result = await uploadPhotos(formData, year, month, day);

  //     if (!result.success) {
  //       throw new Error(result.error || "Ошибка загрузки файлов");
  //     }

  //     return result.urls || [];
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     throw error;
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const onSubmit: SubmitHandler<PurchaseType> = async (formData) => {
    setUploading(true);

    try {
      let photoUrls: string[] = [];

      // Загружаем фото, если они есть
      // if (selectedFiles.length > 0) {
      //   photoUrls = await handlerUpload(selectedFiles, formData.date);
      //   toast.success(`Загружено ${photoUrls.length} фото`);
      // }

      await createPurchaseByDay({
        day: formData.date.getDate(),
        month: formData.date.getMonth() + 1,
        year: formData.date.getFullYear(),
        purchase: formData.purchase,
        fuel: formData.fuel,
        cleaning: formData.cleaning,
        payment: formData.payment,
        photoUrls: photoUrls,
      });

      toast.success("Данные сохранены");
      router.push(`/home/archive?month=${month}&year=${year}`);
    } catch (error) {
      toast.error("Не удалось сохранить данные. Повторите попытку.");
    } finally {
      setUploading(false);
    }
  };

  const classNameDate = "text-blue-600 text-md";
  const classNameField = "grid grid-cols-[40%_40%_10%]";
  const classNameIcon = "text-red-600 w-4 h-4";
  const classNameInput = "text-md w-full";

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full md:w-1/2 px-4 flex flex-col md:mx-auto h-[80vh]">
          <Label>
            <span className="mr-4">всего:</span>
            {total}
          </Label>
          <div className="flex-1 flex items-center">
            <FieldSet className="w-full">
              <FieldGroup>
                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameDate}>дата</FieldLabel>
                  <DatePickerInput
                    fieldName="date"
                    className={classNameDate}
                    disabled={!!data}
                  />

                  <RefreshCcw
                    className="w-4 h-4 text-blue-700"
                    onClick={() => resetField("date")}
                  />
                </Field>

                <Separator className="bg-blue-800 mb-8" />

                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameInput}>закупка</FieldLabel>
                  <NumericInput
                    fieldName="purchase"
                    className={classNameInput}
                  />
                  {purchase && (
                    <Trash2Icon
                      className={classNameIcon}
                      onClick={() => resetField("purchase")}
                    />
                  )}
                </Field>

                <FieldSeparator />

                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameInput}>топливо</FieldLabel>
                  <NumericInput fieldName="fuel" className={classNameInput} />
                  {fuel && (
                    <Trash2Icon
                      className={classNameIcon}
                      onClick={() => resetField("fuel")}
                    />
                  )}
                </Field>

                <FieldSeparator />

                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameInput}>химчистка</FieldLabel>
                  <NumericInput
                    fieldName="cleaning"
                    className={classNameInput}
                  />
                  {cleaning && (
                    <Trash2Icon
                      className={classNameIcon}
                      onClick={() => resetField("cleaning")}
                    />
                  )}
                </Field>

                <FieldSeparator />

                <Field orientation="horizontal" className={classNameField}>
                  <FieldLabel className={classNameInput}>
                    оплата по счету
                  </FieldLabel>
                  <NumericInput
                    fieldName="payment"
                    className={classNameInput}
                  />
                  {payment && (
                    <Trash2Icon
                      className={classNameIcon}
                      onClick={() => resetField("payment")}
                    />
                  )}
                </Field>
                <FieldSeparator />

                <Field orientation="horizontal" className={classNameField}>
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
                </Field>

                {selectedFiles.length > 0 && (
                  <div>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="relative border rounded-lg p-2 group overflow-visible"
                        >
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                          >
                            <X className="w-4 h-4" />
                          </button>

                          {filePreviews[index] &&
                            file.type.startsWith("image/") && (
                              <div className="relative aspect-square">
                                <Image
                                  src={filePreviews[index]}
                                  alt={file.name}
                                  fill
                                  className="object-cover rounded"
                                  sizes="100px"
                                />
                              </div>
                            )}

                          <p className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </FieldGroup>
            </FieldSet>
          </div>

          <div className="mt-0 py-2 flex items-center justify-end gap-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
              disabled={uploading}
            >
              Выйти
            </Button>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting || uploading}
              className="min-w-32"
            >
              {uploading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Загрузка...
                </>
              ) : form.formState.isSubmitting ? (
                "Сохранение..."
              ) : (
                "Сохранить"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
