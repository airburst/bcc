import { FormEventHandler } from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { Button, CancelButton } from "../Button";

export type AnonymousUserValues = {
  id?: string | null;
  name: string;
  mobile?: string | null;
  emergency?: string | null;
  rideId: string;
};

type AnonymousUserFormProps = {
  defaultValues: AnonymousUserValues;
  register: UseFormRegister<AnonymousUserValues>;
  errors: Partial<FieldErrorsImpl<AnonymousUserValues>>;
  isDirty: boolean;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  waiting: boolean;
};

export const AnonymousUserForm = ({
  defaultValues,
  register,
  errors,
  isDirty,
  handleSubmit,
  waiting,
}: AnonymousUserFormProps) => (
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

    <div className="grid w-full grid-cols-2 gap-4 md:gap-8">
      <Button
        variant="primary"
        loading={waiting}
        type="submit"
        disabled={!isDirty && !defaultValues.id}
      >
        <div>Join Ride</div>
      </Button>
      <CancelButton />
    </div>
  </form>
);
