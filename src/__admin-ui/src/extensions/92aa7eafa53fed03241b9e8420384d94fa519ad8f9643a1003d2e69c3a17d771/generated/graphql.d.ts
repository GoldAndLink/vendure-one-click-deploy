export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string | number;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: Date;
};
export type Mutation = {
    __typename?: 'Mutation';
    createPDFTemplate: PdfTemplate;
    deletePDFTemplate: Array<PdfTemplate>;
    updatePDFTemplate: PdfTemplate;
};
export type MutationCreatePdfTemplateArgs = {
    input?: InputMaybe<PdfTemplateInput>;
};
export type MutationDeletePdfTemplateArgs = {
    id: Scalars['ID'];
};
export type MutationUpdatePdfTemplateArgs = {
    id: Scalars['ID'];
    input: PdfTemplateInput;
};
export type PdfTemplate = {
    __typename?: 'PDFTemplate';
    createdAt: Scalars['DateTime'];
    enabled: Scalars['Boolean'];
    id: Scalars['ID'];
    name: Scalars['String'];
    public: Scalars['Boolean'];
    templateString?: Maybe<Scalars['String']>;
    updatedAt: Scalars['DateTime'];
};
export type PdfTemplateInput = {
    enabled: Scalars['Boolean'];
    name: Scalars['String'];
    public: Scalars['Boolean'];
    templateString: Scalars['String'];
};
export type PdfTemplateList = {
    __typename?: 'PDFTemplateList';
    items: Array<PdfTemplate>;
    totalItems: Scalars['Int'];
};
export type Query = {
    __typename?: 'Query';
    availablePDFTemplates: Array<PdfTemplate>;
    pdfTemplates: PdfTemplateList;
};
export type PdfTemplateFieldsFragment = {
    __typename?: 'PDFTemplate';
    id: string | number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    enabled: boolean;
    public: boolean;
    templateString?: string | null;
};
export type UpdatePdfTemplateMutationVariables = Exact<{
    id: Scalars['ID'];
    input: PdfTemplateInput;
}>;
export type UpdatePdfTemplateMutation = {
    __typename?: 'Mutation';
    updatePDFTemplate: {
        __typename?: 'PDFTemplate';
        id: string | number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        enabled: boolean;
        public: boolean;
        templateString?: string | null;
    };
};
export type CreatePdfTemplateMutationVariables = Exact<{
    input: PdfTemplateInput;
}>;
export type CreatePdfTemplateMutation = {
    __typename?: 'Mutation';
    createPDFTemplate: {
        __typename?: 'PDFTemplate';
        id: string | number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        enabled: boolean;
        public: boolean;
        templateString?: string | null;
    };
};
export type DeletePdfTemplateMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export type DeletePdfTemplateMutation = {
    __typename?: 'Mutation';
    deletePDFTemplate: Array<{
        __typename?: 'PDFTemplate';
        id: string | number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        enabled: boolean;
        public: boolean;
        templateString?: string | null;
    }>;
};
export type PdfTemplatesQueryVariables = Exact<{
    [key: string]: never;
}>;
export type PdfTemplatesQuery = {
    __typename?: 'Query';
    pdfTemplates: {
        __typename?: 'PDFTemplateList';
        totalItems: number;
        items: Array<{
            __typename?: 'PDFTemplate';
            id: string | number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            enabled: boolean;
            public: boolean;
            templateString?: string | null;
        }>;
    };
};
export type PdfTemplateNamesQueryVariables = Exact<{
    [key: string]: never;
}>;
export type PdfTemplateNamesQuery = {
    __typename?: 'Query';
    pdfTemplates: {
        __typename?: 'PDFTemplateList';
        totalItems: number;
        items: Array<{
            __typename?: 'PDFTemplate';
            id: string | number;
            name: string;
            enabled: boolean;
            public: boolean;
        }>;
    };
};
