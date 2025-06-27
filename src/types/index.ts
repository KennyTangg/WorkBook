export type ButtonProps = {
    text: string;
    onClick?: () => void;
}

export type KeyFeatureProps = {
    headerText: string;
    description: string;
    IconComponent: React.ElementType;
}

export type TrustMetricsProps = {
    numbers: string;
    description: string;
    IconComponent: React.ElementType;
}
