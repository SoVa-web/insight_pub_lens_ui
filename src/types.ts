export type Review = {
    id: number;
    title: string;
    abstract: string;
    authors: string;
    journal_ref: string;
    source: string;
    id_from_source: string;
    keywords: string[];
    doi: string;
    link: string;
    year: number;
    value: number;
  };
  
  type Stat = {
    range: string;
    count: number;
  };
  
  export type SearchResponse = {
    reviews: Review[];
    total: number;
    stat: Stat[];
    arrayValue: number[];
  };