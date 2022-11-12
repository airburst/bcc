import { FormEventHandler } from "react";
import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { Button } from "../Button";
import { CancelButton } from "../Button/CancelButton";

export type FormValues = {
  id?: string;
  notes?: string;
};

type RideNotesFormProps = {
  defaultValues: FormValues;
  register: UseFormRegister<FormValues>;
  errors: Partial<FieldErrorsImpl<FormValues>>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  waiting: boolean;
};

export const RideForm = ({
  defaultValues,
  register,
  handleSubmit,
  waiting,
}: RideNotesFormProps) => (
  <form
    className="relative grid w-full grid-cols-1 gap-4 p-2"
    onSubmit={handleSubmit}
  >
    <div className="flex flex-col gap-4 md:gap-8">
      <label htmlFor="notes" className="flex flex-col">
        Notes
        <textarea
          id="notes"
          className="rounded"
          rows={4}
          defaultValue={defaultValues.notes}
          {...register("notes")}
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
