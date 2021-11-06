import { FormattedMessage } from "react-intl"


export const IntlDemo: React.FC  = props => {
  return (
    <h1>
      <FormattedMessage
        id="IntlDemo.h1"
        defaultMessage="Welcome to Next.js!" 
      />
    </h1>
  )
}