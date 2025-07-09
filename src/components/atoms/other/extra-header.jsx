import { useContext } from "react";
import { SearchIcon } from "../../../assets/icon";
import InputText from "../../atoms/form/inputText";
import ButtonAdd from "../../atoms/other/btn-add";
import { ContextApp } from "../../../layout";

const ExtraHeader = ({
  onClickBtn = () => {},
  placeholder = "Cari berdasarkan nama",
}) => {
  const { setWildSearch } = useContext(ContextApp);

  return (
    <section className="flex items-center !m-0 ">
      <InputText
        name={"wildSearch"}
        placeholder={placeholder}
        onChange={(e) => {
          setWildSearch(e);
        }}
        className={"!m-0"}
        prefix={<SearchIcon width="15" height="15" />}
      />

      <ButtonAdd onClick={onClickBtn} />
    </section>
  );
};
export default ExtraHeader;
