import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Form = styled.form`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  max-width: 80rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-grey-500);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const Input = styled.input`
  padding: 1rem 1.4rem;
  font-size: 1.5rem;
  color: var(--color-grey-800);
  background-color: var(--color-grey-200);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  outline: none;
  transition: all 0.2s;
  height: 4.4rem;

  &:focus {
    border-color: var(--color-brand-500);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }

  /* Decorative date picker */
  &[type="date"] {
    accent-color: #6366f1;
    cursor: pointer;
    position: relative;

    &::-webkit-calendar-picker-indicator {
      filter: invert(0.5) sepia(1) saturate(5) hue-rotate(210deg);
      cursor: pointer;
      padding: 0.2rem;
      border-radius: 4px;
      transition: all 0.2s;
    }
    &::-webkit-calendar-picker-indicator:hover {
      filter: invert(0.3) sepia(1) saturate(8) hue-rotate(210deg);
      background-color: rgba(99, 102, 241, 0.1);
    }
  }
`;

const Select = styled.select`
  padding: 1rem 1.4rem;
  font-size: 1.5rem;
  color: var(--color-grey-800);
  background-color: var(--color-grey-200);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  outline: none;
  transition: all 0.2s;
  height: 4.4rem;
  cursor: pointer;

  &:focus {
    border-color: var(--color-brand-500);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

const Textarea = styled.textarea`
  padding: 1rem 1.4rem;
  font-size: 1.5rem;
  color: var(--color-grey-800);
  background-color: var(--color-grey-200);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  outline: none;
  resize: vertical;
  min-height: 8rem;
  transition: all 0.2s;

  &:focus {
    border-color: var(--color-brand-500);
  }
`;

const SubmitBtn = styled.button`
  align-self: flex-start;
  padding: 1.2rem 3.2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.span`
  font-size: 1.2rem;
  color: #f87171;
`;

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia",
  "Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus",
  "Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil",
  "Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada",
  "Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica",
  "Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic",
  "East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini",
  "Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece",
  "Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica",
  "Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania",
  "Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco",
  "Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua",
  "Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau",
  "Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
  "Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia",
  "Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia",
  "Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka",
  "Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand",
  "Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda",
  "Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

function NewBooking() {
  const queryClient = useQueryClient();
  const { data: cabins = [], isLoading: cabinsLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: createBooking, isPending } = useMutation({
    mutationFn: async (data) => {
      // First create or find the guest
      const { data: existingGuest } = await supabase
        .from("guests")
        .select("id")
        .eq("email", data.guestEmail)
        .single();

      let guestId;
      if (existingGuest) {
        guestId = existingGuest.id;
      } else {
        const { data: newGuest, error: guestError } = await supabase
          .from("guests")
          .insert([
            {
              fullName: data.guestName,
              email: data.guestEmail,
              nationality: data.nationality || "Unknown",
            },
          ])
          .select()
          .single();

        if (guestError) throw new Error(guestError.message);
        guestId = newGuest.id;
      }

      // Create booking
      const cabin = cabins.find((c) => c.id === Number(data.cabinId));
      const numNights =
        Math.ceil(
          (new Date(data.endDate) - new Date(data.startDate)) /
            (1000 * 60 * 60 * 24)
        ) || 1;
      const cabinPrice = (cabin?.regularPrice || 0) * numNights;

      const { error } = await supabase.from("bookings").insert([
        {
          startDate: data.startDate,
          endDate: data.endDate,
          numNights,
          numGuests: Number(data.numGuests) || 1,
          cabinPrice,
          totalPrice: cabinPrice,
          extrasPrice: 0,
          status: "unconfirmed",
          hasBreakfast: false,
          isPaid: false,
          observations: data.observations || "",
          cabinId: Number(data.cabinId),
          guestId,
        },
      ]);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success("Booking created successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">New Booking</Heading>
      </Row>

      <Form onSubmit={handleSubmit(createBooking)}>
        <Heading as="h3">Guest Details</Heading>
        <FormGrid>
          <FieldGroup>
            <Label>Full Name</Label>
            <Input
              {...register("guestName", { required: "Guest name is required" })}
              placeholder="John Doe"
            />
            {errors.guestName && (
              <ErrorMsg>{errors.guestName.message}</ErrorMsg>
            )}
          </FieldGroup>
          <FieldGroup>
            <Label>Email</Label>
            <Input
              type="email"
              {...register("guestEmail", { required: "Email is required" })}
              placeholder="guest@email.com"
            />
            {errors.guestEmail && (
              <ErrorMsg>{errors.guestEmail.message}</ErrorMsg>
            )}
          </FieldGroup>
          <FieldGroup>
            <Label>Nationality</Label>
            <Select {...register("nationality")}>
              <option value="">Select country…</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </FieldGroup>
          <FieldGroup>
            <Label>Number of Guests</Label>
            <Input
              type="number"
              min="1"
              defaultValue="1"
              {...register("numGuests")}
            />
          </FieldGroup>
        </FormGrid>

        <Heading as="h3">Stay Details</Heading>
        <FormGrid>
          <FieldGroup>
            <Label>Cabin</Label>
            <Select
              {...register("cabinId", { required: "Please select a cabin" })}
              disabled={cabinsLoading}
            >
              <option value="">Select a cabin…</option>
              {cabins.map((cabin) => (
                <option key={cabin.id} value={cabin.id}>
                  {cabin.name} — ${cabin.regularPrice}/night (max{" "}
                  {cabin.maxCapacity})
                </option>
              ))}
            </Select>
            {errors.cabinId && <ErrorMsg>{errors.cabinId.message}</ErrorMsg>}
          </FieldGroup>
          <FieldGroup>
            <Label>Check-in Date</Label>
            <Input
              type="date"
              {...register("startDate", { required: "Check-in date required" })}
            />
            {errors.startDate && (
              <ErrorMsg>{errors.startDate.message}</ErrorMsg>
            )}
          </FieldGroup>
          <FieldGroup>
            <Label>Check-out Date</Label>
            <Input
              type="date"
              {...register("endDate", { required: "Check-out date required" })}
            />
            {errors.endDate && <ErrorMsg>{errors.endDate.message}</ErrorMsg>}
          </FieldGroup>
        </FormGrid>

        <FieldGroup>
          <Label>Observations</Label>
          <Textarea
            {...register("observations")}
            placeholder="Any special requests…"
          />
        </FieldGroup>

        <SubmitBtn type="submit" disabled={isPending}>
          {isPending ? "Creating…" : "Create Booking"}
        </SubmitBtn>
      </Form>
    </>
  );
}

export default NewBooking;
