import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useEffect } from "react";
import Loading from "./components/Loading";
import { useCadastroContext } from "~/Context";
import ModalConfirmation from "~/components/ModalConfirmacao";
import { validarCPF } from "~/utils/formats";
import Error from "./components/Error";
import ModalMessage from "~/components/ModalMessage";

const DashboardPage = () => {
  const { loading, getDados, error } = useCadastroContext();

  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [filter, setFilter] = useState("");

  // const { fetchDados, changeSatus, deleteCard } = useDadosDashboard();

  // const fetchDados = async () => {
  //   let filterParams = "";
  //   if (filter) {
  //     filterParams = `?cpf=${filter.replace(/[^\d]+/g, "")}`;
  //   }

  //   setLoading(true);
  //   await axios(`http://localhost:3000/registrations${filterParams}`, {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       return res.data;
  //     })
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // };

  // const changeSatus = (status: string, data: any) => {
  //   console.log("change");
  //   const teste = {
  //     admissionDate: "22/10/2023",
  //     email: "filipe@caju.com.br",
  //     employeeName: "Filipe Marins",
  //     status: status,
  //     cpf: "78502270001",
  //   };
  //   axios(`http://localhost:3000/registrations/${data.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "content-type": "application/json;charset=UTF-8",
  //     },
  //     data: { ...teste },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         alert("Alterado status com sucesso");

  //         fetchDados();
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // };

  // const deleteCard = (id: string) => {
  //   fetch(`http://localhost:3000/registrations/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "content-type": "application/json;charset=UTF-8",
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status === 200) {
  //         alert("Excluido card com sucesso");

  //         fetchDados();
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // };
  // const getDados = async () => {
  //   await fetchDados();
  //   // .then((data: any) => {
  //   //   console.log("teste 1", data);
  //   //   setData(data);
  //   //   setLoading(false);
  //   // });
  // };

  useEffect(() => {
    getDados();
  }, []);

  if (error) {
    return <Error msgError={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ModalConfirmation />
      <ModalMessage />
      <S.Container>
        <SearchBar />
        <Collumns />
      </S.Container>
    </>
  );
};
export default DashboardPage;
