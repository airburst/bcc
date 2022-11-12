import { FormEventHandler, Fragment, useState } from "react";
import {
  UseFormRegister,
  FieldErrorsImpl,
  useForm,
  SubmitHandler,
} from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { useSWRConfig } from "swr";
import { updateRideNotes } from "../../hooks";
import { Button } from "../Button";

export type FormValues = {
  notes?: string;
};

type RideNotesFormProps = {
  defaultValues: FormValues;
  register: UseFormRegister<FormValues>;
  errors: Partial<FieldErrorsImpl<FormValues>>;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  isDirty: boolean;
  waiting: boolean;
  closeHandler?: () => void;
};

// Define the form
const RideNotesForm = ({
  defaultValues,
  register,
  handleSubmit,
  waiting,
  isDirty,
  closeHandler,
}: RideNotesFormProps) => (
  <form
    className="relative grid w-full grid-cols-1 gap-4"
    onSubmit={handleSubmit}
  >
    <div className="flex flex-col gap-4 md:gap-8">
      <label htmlFor="notes" className="flex flex-col">
        <textarea
          id="notes"
          aria-label="ride note"
          className="rounded"
          rows={4}
          defaultValue={defaultValues.notes}
          {...register("notes")}
        />
      </label>
    </div>

    <div className="grid w-full grid-cols-2 grid-rows-[48px] gap-4 md:gap-8">
      <Button loading={waiting} disabled={!isDirty} type="submit">
        <div>Set Note</div>
      </Button>
      <Button variant="cancel" disabled={waiting} onClick={closeHandler}>
        <span>Cancel</span>
      </Button>
    </div>
  </form>
);

type Props = {
  rideId?: string;
  userId?: string;
  rideNotes?: string;
  showNotesForm: boolean;
  closeHandler: () => void;
};

export const RideNotes = ({
  rideId,
  userId,
  rideNotes,
  showNotesForm,
  closeHandler,
}: Props) => {
  const { mutate } = useSWRConfig();
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>();

  // Initial state for form: set name, leader and time
  const defaultValues = { notes: rideNotes };

  const onSubmit: SubmitHandler<FormValues> = async ({ notes }) => {
    setWaiting(true);
    const results = await mutate(`/api/ride/${rideId}`, () => {
      if (rideId && userId) {
        updateRideNotes(rideId, userId, notes || "");
      }
    });

    if (results.id) {
      closeHandler();
    }
  };

  return (
    <Transition appear show={showNotesForm} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeHandler}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add ride notes
                </Dialog.Title>

                <div className="mt-2">
                  <div className="w-full text-neutral-800">
                    <RideNotesForm
                      defaultValues={defaultValues}
                      errors={errors}
                      isDirty={isDirty}
                      register={register}
                      handleSubmit={handleSubmit(onSubmit)}
                      waiting={waiting}
                      closeHandler={closeHandler}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
