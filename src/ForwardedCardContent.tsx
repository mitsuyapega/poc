import React from 'react';
import { CardContent } from "@pega/cosmos-react-core";

const ForwardedCardContent = React.forwardRef<HTMLDivElement, any>((props, ref) => (
  <CardContent {...props} container={{...props.container, ref}} />
));

export default ForwardedCardContent;