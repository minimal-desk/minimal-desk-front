import { memo, ReactNode, VFC } from "react";
import { ConsoleFooter, ConsoleNavBar } from "../../organisms";

type Props = {
  children: ReactNode;
};

export const Layout: VFC<Props> = memo(function layout(props) {
  const { children } = props;
  return (
    <>
      <ConsoleNavBar />
      {children}
      <ConsoleFooter />
    </>
  );
});
