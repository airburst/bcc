import { FormEventHandler } from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { Preferences } from "../../types";
import { Button } from "../Button";
import { CancelButton } from "../Button/CancelButton";

export type UserProfileValues = {
  id: string;
  name: string;
  email: string;
  mobile?: string | null;
  emergency?: string | null;
  preferences?: Preferences;
};

type UserProfileFormProps = {
  defaultValues: UserProfileValues;
  register: UseFormRegister<UserProfileValues>;
  errors: Partial<FieldErrorsImpl<UserProfileValues>>;
  isDirty: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  waiting: boolean;
};

export const UserProfileForm = ({
  defaultValues,
  register,
  errors,
  isDirty,
  handleSubmit,
  waiting,
}: UserProfileFormProps) => (
  <form
    className="relative grid w-full grid-cols-1 gap-4 p-2"
    onSubmit={handleSubmit}
  >
    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="name" className="flex flex-col gap-1 font-medium">
        Name *
        <input
          id="name"
          type="text"
          className="rounded font-normal"
          defaultValue={defaultValues.name}
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="font-normal text-red-500">
            Rider name is required
          </span>
        )}
      </label>
    </div>

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="mobile" className="flex flex-col">
        Mobile *
        <input
          id="mobile"
          type="text"
          className="rounded"
          defaultValue={defaultValues.mobile || ""}
          {...register("mobile", {
            required: true,
            minLength: {
              value: 11,
              message:
                "This doesn't look long enough to contain a phone number",
            },
          })}
        />
        {errors.mobile && (
          <span className="font-normal text-red-500">
            Please enter a valid phone number
          </span>
        )}
      </label>
    </div>

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="emergency" className="flex flex-col">
        Emergency Contact *
        <input
          id="emergency"
          type="text"
          placeholder="Name and contact number"
          className="rounded"
          defaultValue={defaultValues.emergency || ""}
          {...register("emergency", {
            required: true,
            minLength: {
              value: 11,
              message:
                "This doesn't look long enough to contain a phone number",
            },
          })}
        />
        {errors.emergency && (
          <span className="font-normal text-red-500">
            Please enter a valid name and phone number for contact
          </span>
        )}
      </label>
    </div>

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="email" className="flex flex-col gap-1 font-medium">
        Email
        <input
          id="email"
          type="text"
          className="rounded border-neutral-300 bg-neutral-200 font-normal text-neutral-600"
          defaultValue={defaultValues.email}
          disabled
          {...register("email")}
        />
      </label>
    </div>

    <div className="mx-[-8px] flex w-screen flex-row items-center justify-center bg-blue-900 p-2 font-bold uppercase tracking-wide text-white sm:rounded md:mx-0 md:w-full">
      Preferences
    </div>

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="units" className="flex flex-col">
        Units
        <select
          id="units"
          className="rounded"
          defaultValue={defaultValues?.preferences?.units || ""}
          {...register("preferences.units")}
        >
          <option value="km">Km</option>
          <option value="miles">Miles</option>
        </select>
      </label>
    </div>

    <div className="grid w-full grid-cols-2 gap-4 md:gap-8">
      <Button loading={waiting} type="submit" disabled={!isDirty}>
        <div>Save</div>
      </Button>
      <CancelButton />
    </div>
  </form>
);
