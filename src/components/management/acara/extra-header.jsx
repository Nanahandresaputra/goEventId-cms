import { SearchIcon } from "../../../assets/icon";
import InputText from "../../atoms/form/inputText";
import ButtonAdd from "../../atoms/other/btn-add";

const ExtraHeaderAcara = ({
  onChangeSearch = () => {},
  onClickBtnAdd = () => {},
}) => {
  return (
    <section className="flex items-center !m-0 ">
      <InputText
        name={"search"}
        placeholder={"Cari berdasarkan nama"}
        onChange={onChangeSearch}
        className={"!m-0"}
        prefix={<SearchIcon width="15" height="15" />}
      />

      <ButtonAdd onClick={onClickBtnAdd} />
    </section>
  );
};
export default ExtraHeaderAcara;
