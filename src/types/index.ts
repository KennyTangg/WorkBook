export interface ButtonProps {
    text: string;
    onClick?: () => void;
}

export interface KeyFeatureProps {
    headerText: string;
    description: string;
    IconComponent: React.ElementType;
}

export interface TrustMetricsProps {
    numbers: string;
    description: string;
    IconComponent: React.ElementType;
}
