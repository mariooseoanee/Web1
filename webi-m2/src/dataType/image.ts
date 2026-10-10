/*
la response es JSON que contiene un objeto collection con un array items
cada item tiene un array data y un array links
*/

export interface ImageAPI { // lo recibido en la response, lo mapeamos a esta interfaz
  id: number;
  title: string;
  date: string;
  year: string;
  imageUrl: string;
  description: string;
}