export type RedirectKey = string;

export type Redirect = {
    title: string;
    description: string;
    url: string;
    _key?: RedirectKey;
};

export type Redirects = Record<RedirectKey, Redirect>;
