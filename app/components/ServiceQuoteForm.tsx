"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ServiceQuoteFormProps {
  /** Pre-selected media type: Print | Television | Radio */
  defaultMediaType: "Print" | "Television" | "Radio";
}

const LOCATION_OPTIONS = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Nationwide"];
const OBJECTIVE_OPTIONS = [
  "Brand Awareness",
  "Product Launch",
  "Lead Generation",
  "Event Promotion",
  "Sales Drive",
  "Others",
];
const BUDGET_OPTIONS = [
  "Under ₦500,000",
  "₦500,000 – ₦1,000,000",
  "₦1,000,000 – ₦5,000,000",
  "₦5,000,000 – ₦10,000,000",
  "Above ₦10,000,000",
];
const TIMING_OPTIONS = ["ASAP", "This month", "Next month", "In 3 months", "Flexible"];
const DURATION_OPTIONS = ["1 week", "2 weeks", "1 month", "3 months", "6 months", "1 year"];
const MEDIA_OPTIONS = ["Print", "Television", "Radio"];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#344054] mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function TextInput({
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] text-sm text-[#101928] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition"
    />
  );
}

function SelectInput({
  placeholder,
  value,
  onChange,
  options,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border border-[#D0D5DD] text-sm text-[#101928] bg-white focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#667185] pointer-events-none"
      />
    </div>
  );
}

export default function ServiceQuoteForm({
  defaultMediaType,
}: ServiceQuoteFormProps) {
  const [brandName, setBrandName] = useState("");
  const [location, setLocation] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [objective, setObjective] = useState("");
  const [commencementDate, setCommencementDate] = useState("");
  const [budget, setBudget] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [timing, setTiming] = useState("");
  const [duration, setDuration] = useState("");
  const [consumerAction, setConsumerAction] = useState("");
  const [mediaType, setMediaType] = useState(defaultMediaType);
  const [description, setDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // wire to your API
    console.log({
      brandName,
      location,
      companyAddress,
      targetAudience,
      objective,
      commencementDate,
      budget,
      deliverables,
      timing,
      duration,
      consumerAction,
      mediaType,
      description,
      contactName,
      contactCompany,
      phone,
      email,
    });
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[#E4E7EC] p-6 sm:p-8 lg:p-10 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-[#101928]">Get a Quick Quote</h2>
      <p className="mt-1 text-sm text-[#667185] mb-8">
        Tell us your goals, we&apos;ll find the right toolkit for your budget and
        reach.
      </p>

      {/* Campaign fields — 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Brand/Company name">
          <TextInput
            placeholder="e.g. Acme"
            value={brandName}
            onChange={setBrandName}
          />
        </Field>

        <Field label="Location/Scope">
          <SelectInput
            placeholder="Select location"
            value={location}
            onChange={setLocation}
            options={LOCATION_OPTIONS}
          />
        </Field>

        <Field label="Company Address">
          <TextInput
            placeholder="Company address"
            value={companyAddress}
            onChange={setCompanyAddress}
          />
        </Field>

        <Field label="Target Audience">
          <TextInput
            placeholder="Target audience"
            value={targetAudience}
            onChange={setTargetAudience}
          />
        </Field>

        <Field label="Campaign objective">
          <SelectInput
            placeholder="Campaign objective"
            value={objective}
            onChange={setObjective}
            options={OBJECTIVE_OPTIONS}
          />
        </Field>

        <Field label="Commencement date">
          <TextInput
            type="date"
            placeholder="Commencement date"
            value={commencementDate}
            onChange={setCommencementDate}
          />
        </Field>

        <Field label="Campaign budget">
          <SelectInput
            placeholder="Select budget"
            value={budget}
            onChange={setBudget}
            options={BUDGET_OPTIONS}
          />
        </Field>

        <Field label="Deliverables/KPIs">
          <TextInput
            placeholder="Deliverables/KPIs"
            value={deliverables}
            onChange={setDeliverables}
          />
        </Field>

        <Field label="Campaign timing">
          <SelectInput
            placeholder="Campaign timing"
            value={timing}
            onChange={setTiming}
            options={TIMING_OPTIONS}
          />
        </Field>

        <Field label="Campaign duration">
          <SelectInput
            placeholder="Campaign duration"
            value={duration}
            onChange={setDuration}
            options={DURATION_OPTIONS}
          />
        </Field>

        <Field label="Desired Consumer Action">
          <TextInput
            placeholder="Desired consumer action"
            value={consumerAction}
            onChange={setConsumerAction}
          />
        </Field>

        <Field label="Media type">
          <SelectInput
            placeholder="Media type"
            value={mediaType}
            onChange={(v) =>
              setMediaType(v as "Print" | "Television" | "Radio")
            }
            options={MEDIA_OPTIONS}
          />
        </Field>
      </div>

      {/* Full width description */}
      <div className="mt-5">
        <Field label="Campaign Details/Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Campaign Details/Description"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] text-sm text-[#101928] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#0177AB]/20 focus:border-[#0177AB] transition resize-none"
          />
        </Field>
      </div>

      {/* Contact Details */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-[#101928] mb-4">
          Contact Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Name">
            <TextInput
              placeholder="Name"
              value={contactName}
              onChange={setContactName}
            />
          </Field>

          <Field label="Company">
            <TextInput
              placeholder="Company"
              value={contactCompany}
              onChange={setContactCompany}
            />
          </Field>

          <Field label="Phone/WhatsApp">
            <TextInput
              placeholder="Phone/WhatsApp"
              value={phone}
              onChange={setPhone}
              type="tel"
            />
          </Field>

          <Field label="Email Address">
            <TextInput
              placeholder="Email address"
              value={email}
              onChange={setEmail}
              type="email"
            />
          </Field>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2.5 rounded-xl border border-[#D0D5DD] text-sm font-semibold text-[#344054] hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-[#0177AB] hover:bg-[#016693] text-white text-sm font-semibold transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}