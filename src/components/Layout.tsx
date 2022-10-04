import { Header } from "./Header";
import { MainContent } from "./MainContent";

type Props = {
  children: JSX.Element,
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <MainContent>{children}</MainContent>
    </>
  );
}
