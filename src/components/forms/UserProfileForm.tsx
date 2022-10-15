import { FormEventHandler } from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { Button } from "../Button";
import { CancelButton } from "../Button/CancelButton";

export type UserProfileValues = {
  id: string;
  name: string;
  email: string;
  image?: string;
  mobile?: string | null;
  role: string;
};

type UserProfileFormProps = {
  defaultValues: UserProfileValues;
  register: UseFormRegister<UserProfileValues>;
  errors: Partial<FieldErrorsImpl<UserProfileValues>>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  waiting: boolean;
};

export const UserProfileForm = ({
  defaultValues,
  register,
  errors,
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
      <label htmlFor="group" className="flex flex-col gap-1 font-medium">
        Email
        <input
          id="group"
          type="text"
          className="rounded font-normal"
          defaultValue={defaultValues.email}
          disabled
          {...register("email", { required: true })}
        />
      </label>
    </div>

    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      <label htmlFor="destination" className="flex flex-col">
        Mobile
        <input
          id="mobile"
          type="text"
          className="rounded"
          defaultValue={defaultValues.mobile || ""}
          {...register("mobile")}
        />
      </label>
    </div>

    <div className="grid w-full grid-cols-2 gap-4 md:gap-8">
      <Button loading={waiting} type="submit">
        <div>Submit</div>
      </Button>
      <CancelButton />
    </div>
  </form>
);
