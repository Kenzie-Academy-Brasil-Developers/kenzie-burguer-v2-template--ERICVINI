import { MdSearch } from 'react-icons/md';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../../../providers/UserContext';

export type tOnSubmit = {
  search: string;
}

const SearchForm = () => {
  const {register, handleSubmit} = useForm<tOnSubmit>({});
  const {searchProduct} = useContext(UserContext)

  const submit: SubmitHandler<tOnSubmit> = ({search}) => {
    searchProduct(search)
  }
  return (
  <StyledSearchForm onSubmit={handleSubmit(submit)} onChange={handleSubmit(submit)}>
    <input type='text' placeholder='Digitar pesquisa' {...register("search")}/>
    <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
      <MdSearch />
    </StyledButton>
  </StyledSearchForm>
)};

export default SearchForm;
