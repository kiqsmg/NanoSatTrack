import { ScaleLinear as D3ScaleLinear, ScalePoint as D3ScalePoint, ScaleBand as D3ScaleBand, ScaleLogarithmic as D3ScaleLogarithmic, ScaleSymLog as D3ScaleSymLog, ScaleTime as D3ScaleTime } from 'd3-scale';
import { TIME_PRECISION } from './timeHelpers';
export declare type ScaleAxis = 'x' | 'y';
export declare type OtherScaleAxis<Axis extends ScaleAxis> = Axis extends 'x' ? 'y' : 'x';
export declare type NumericValue = {
    valueOf(): number;
};
export declare type StringValue = {
    toString(): string;
};
export declare type ScaleValue = NumericValue | StringValue | Date;
export interface ScaleTypeToSpec {
    linear: ScaleLinearSpec;
    log: ScaleLogSpec;
    symlog: ScaleSymlogSpec;
    point: ScalePointSpec;
    band: ScaleBandSpec;
    time: ScaleTimeSpec;
}
export declare type ScaleType = keyof ScaleTypeToSpec;
export declare type ScaleSpec = ScaleTypeToSpec[keyof ScaleTypeToSpec];
export interface ScaleTypeToScale<Input, Output> {
    linear: ScaleLinear<Output>;
    log: ScaleLog;
    symlog: ScaleSymlog;
    point: ScalePoint<Input>;
    band: ScaleBand<Input>;
    time: ScaleTime<Input>;
}
export declare type Scale<Input, Output> = ScaleTypeToScale<Input, Output>[keyof ScaleTypeToScale<Input, Output>];
export declare type ScaleLinearSpec = {
    type: 'linear';
    min?: 'auto' | number;
    max?: 'auto' | number;
    stacked?: boolean;
    reverse?: boolean;
    clamp?: boolean;
    nice?: boolean | number;
};
export interface ScaleLinear<Output> extends D3ScaleLinear<number, Output, never> {
    type: 'linear';
    stacked: boolean;
}
export interface ScaleLogSpec {
    type: 'log';
    base?: number;
    min?: 'auto' | number;
    max?: 'auto' | number;
}
export interface ScaleLog extends D3ScaleLogarithmic<number, number> {
    type: 'log';
}
export interface ScaleSymlogSpec {
    type: 'symlog';
    constant?: number;
    min?: 'auto' | number;
    max?: 'auto' | number;
    reverse?: boolean;
}
export interface ScaleSymlog extends D3ScaleSymLog<number, number> {
    type: 'symlog';
}
export declare type ScalePointSpec = {
    type: 'point';
};
export interface ScalePoint<Input extends StringValue> extends D3ScalePoint<Input> {
    type: 'point';
}
export declare type ScaleBandSpec = {
    type: 'band';
    round?: boolean;
};
export interface ScaleBand<Input extends StringValue> extends D3ScaleBand<Input> {
    type: 'band';
}
export declare type ScaleTimeSpec = {
    type: 'time';
    format?: 'native' | string;
    precision?: TIME_PRECISION;
    min?: 'auto' | Date | string;
    max?: 'auto' | Date | string;
    useUTC?: boolean;
    nice?: boolean;
};
export interface ScaleTime<Input> extends D3ScaleTime<Input, number> {
    type: 'time';
    useUTC: boolean;
}
export declare type AnyScale = Scale<any, any>;
export declare type ScaleWithBandwidth = ScaleBand<any> | ScalePoint<any>;
export declare type Series<XValue extends ScaleValue, YValue extends ScaleValue> = {
    data: {
        data: {
            x: XValue | null;
            y: YValue | null;
        };
    }[];
}[];
export declare type SerieAxis<Axis extends ScaleAxis, Value extends ScaleValue> = {
    data: {
        data: Record<Axis, Value | null>;
    }[];
}[];
export declare type ComputedSerieAxis<Value extends ScaleValue> = {
    all: Value[];
    min: Value;
    minStacked?: Value;
    max: Value;
    maxStacked?: Value;
};
export declare type TicksSpec<Value extends ScaleValue> = number | string | Value[];
//# sourceMappingURL=types.d.ts.map