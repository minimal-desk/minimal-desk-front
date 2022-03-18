import { FormattedMessage } from "react-intl";
import Link from "next/link";
import styles from "./ConsoleFooter.module.css";

type ConsoleFooterProps = {

};

type ItemProps = {
  href: string,
  key: string,
  isFirst?: boolean
};

const FooterItem: React.FC<ItemProps> = ({ children, href, key, isFirst }) => (
  <li key={key}>
    <Link href={href}><a className="">{children}</a></Link>
  </li>
);

export const ConsoleFooter = ({
}: ConsoleFooterProps) => {
  return (
    <footer className={styles.container}>
      <div className="container">
        <div className="row">
          <div className="col">
            <ul>
              <FooterItem href="/pricing" key="ConsoleFooter.Pricing" isFirst={true}>
                <FormattedMessage id="ConsoleFooter.Pricing" defaultMessage="Pricing" />
              </FooterItem>

              <FooterItem href="/terms" key="ConsoleFooter.Terms">
                <FormattedMessage id="ConsoleFooter.Terms" defaultMessage="Terms" />
              </FooterItem>
              
              <FooterItem href="/about" key="ConsoleFooter.About">
                <FormattedMessage id="ConsoleFooter.About" defaultMessage="About" />
              </FooterItem>
            </ul>
            <p>© 2021 MinimalDesk</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
