import InputField from "@components/InputField";

export default function HistorySearch({
  placeholder,
  handleSubmit,
  onSearchSubmit,
  register,
}) {
  return (
    <form className="relative" onSubmit={handleSubmit(onSearchSubmit)}>
      <InputField
        placeholder={placeholder}
        isLast={true}
        className="pr-10"
        register={register("keyword")}
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <img src="/icons/search.svg" />
      </button>
    </form>
  );
}
