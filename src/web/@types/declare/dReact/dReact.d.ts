/**
 * Created by garrettzhou@2018-9-1
 * react 常用类型
 */
declare namespace dReact {
    type State = never;
    type Props = { children?: React.ReactNode };

    type GetClassKey<T extends ReactJss.PropInjector<any, any>> = T extends ReactJss.PropInjector<ReactJss.WithSheet<infer C, any>, any> ? C extends string ? C : string : never;

    type GetClassProps<T extends ReactJss.PropInjector<any, any>> = ReactJss.StyledComponentProps<GetClassKey<T>>;

    type RootJss = Required<dReact.GetClassProps<typeof import('../../../react/page/@jss/Root').default>>['classes'];

    type RootContext = { classes: RootJss };

    type GetProps<TComponent extends React.Component | React.ComponentType<any> | React.SFC<any>> =
        TComponent extends React.Component<infer Props> ? Props :
        TComponent extends React.ComponentType<infer Props> ? Props :
        TComponent extends React.SFC<infer Props> ? Props :
        TComponent extends React.MemoExoticComponent<(props: infer Props) => any> ? Props : never;
    type GetState<TComponent extends React.Component> = TComponent extends React.Component<any, infer State> ? State : never;

    type Axis = {
        x: number;
        y: number;
    };
}
