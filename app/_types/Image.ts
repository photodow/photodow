export type ImageKey = string;

export type Image = {
    _key: ImageKey;
    src: string;
    alt: string;
    caption?: string;
};

export type Images = Record<ImageKey, Image>;
