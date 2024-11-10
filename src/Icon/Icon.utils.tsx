import Icon from "./Icon";
import { AvailableIcons, IconProps } from "./Icon.types";

export const RenderIcon = (name: AvailableIcons, props?: Omit<IconProps, 'name'>) => <Icon name={name} {...props} />