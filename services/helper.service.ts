import { FormGroup, FormControl } from "@angular/forms";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class HelperService {
  /**
   * Reordena un array aleatoriamente
   * @param arg Array a ordenar
   */
  randomizeArray(arg: any[]): any[] {
    const array = arg.slice();
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  /**
   * Reordena los índices un array aleatoriamente
   * @param arg Array a ordenar
   */
  randomizeIndex = (arg: any[]): number[] =>
    this.randomizeArray(Array.from({ length: arg.length }, (u, i) => i));

  /**
   * Obtiene el atributo ng del componente
   * @param elementRef Elemento de referencia
   */
  getComponentAttribute = (elementRef: HTMLElement): Attr[] =>
    Array.from(elementRef.attributes).filter((elm: Attr) =>
      elm.name.includes("_ng")
    );

  /**
   * Mínimo valor de un array
   * @param arg Array
   * @param prop propiedad si los valores son objetos
   */
  getMinValue = (arg: any[], prop?: string) =>
    arg.reduce(
      (pre, cur) =>
        (prop ? +cur[prop] : +cur) > +pre ? +pre : prop ? +cur[prop] : +cur,
      0
    );

  /**
   * Máximo valor de un array
   * @param arg Array
   * @param prop propiedad si los valores son objetos
   */
  getMaxValue = (arg: any[], prop?: string) =>
    arg.reduce(
      (pre, cur) =>
        (prop ? +cur[prop] : +cur) < +pre ? +pre : prop ? +cur[prop] : +cur,
      0
    );

  /**
   * Verifica si una imagen carga correctamente
   * @param path Ubicación de la imagen
   */
  checkImg = (path: string): Promise<string> =>
    new Promise((res) => {
      const img = new Image();
      img.onload = () => res(path);
      img.onerror = () => res("");
      img.src = path;
    });

  /**
   * Por documentar
   * @param data
   * @param max
   */
  separateArray = (data: any[], max = 5): any[][] => {
    if (data.length > 0) {
      const size =
        Math.floor(data.length / max) + (data.length % max === 0 ? 0 : 1);
      const times = Math.ceil(data.length / size);
      const result: any = Array.from({ length: size }, () => []);
      let [idx, time] = [0, 0];
      data.forEach((elm, i) => {
        time < times ? time++ : ((time = 1), idx++);
        result[idx].push(elm);
      });
      return result;
    } else {
      return [[]];
    }
  };

  /** Separar cadena de texto por un caracter especifico
   * @param string Cadena de texto
   * @param character Caracter por el que se va a separar la cadena
   * @return Array con cadena separa por el caracter definido
   */
  separateStringByCharacter = (string: string, character: string): string[] =>
    string.split(character);

  // getObjectNotReferenced(): Método que devuelve un objeto nuevo sin referencias internas
  getObjectNotReferenced(object: object): object {
    // setObjectProperties(): Rompe la referencia de las propiedades de un objeto
    const setObjectProperties = (elmReferenced: object) => {
      // ↓ Objeto a retonar sin referencias
      const option = {} as any;
      // ↓ Itera las propiedades del objeto y rompe las referencias que pueda tener
      Object.keys(elmReferenced).forEach((elm: string) => {
        option[elm] =
          typeof elmReferenced[elm as keyof typeof elmReferenced] !== "object"
            ? Object.values({
                bk: elmReferenced[elm as keyof typeof elmReferenced],
              })[0]
            : Array.isArray(elmReferenced[elm as keyof typeof elmReferenced])
            ? [...elmReferenced[elm as keyof typeof elmReferenced]]
            : elmReferenced[elm as keyof typeof elmReferenced] === null
            ? null
            : {
                ...setObjectProperties(
                  elmReferenced[elm as keyof typeof elmReferenced]
                ),
              };
      });
      // ↓ Dvuelve el objeto sin referencias
      return option;
    };
    // objectToReturn: Objeto a retornar sin referencias
    const objectToReturn: any = {};
    // ↓ Itera las propiedades del objeto y rompe las referencias que pueda tener
    Object.keys(object).forEach((elm) => {
      objectToReturn[elm] =
        typeof object[elm as keyof typeof object] !== "object"
          ? Object.values({ bk: object[elm as keyof typeof object] })[0]
          : Array.isArray(object[elm as keyof typeof object])
          ? [...object[elm as keyof typeof object]]
          : object[elm as keyof typeof object] === null
          ? null
          : { ...setObjectProperties(object[elm as keyof typeof object]) };
    });
    // ↓ Devuelve el objeto sin referencias
    return { ...objectToReturn };
  }

  // Método que devuelve random de colores
  getRandomColor() {
    const caracteres = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += caracteres[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  /**
   *
   * Descargar archivo
   * @param title Nombre del archivo
   * @param blob Blob del archivo
   * @param ext Extensión del archivo
   *
   */
  downloadFile = (title: string, blob: any, ext: string) => {
    let date = new Date();
    let timestamp =
      date.getFullYear() +
      "_" +
      (date.getMonth() + 1) +
      "_" +
      date.getDate() +
      "_" +
      date.getHours() +
      "_" +
      date.getMinutes();

    const link = document.createElement("a");
    // ↓ Agrega la url del archivo al link
    link.href = window.URL.createObjectURL(blob);
    // ↓ Asigna el nombre del archivo
    link.download = `${title}_${timestamp}.${ext}`;
    // ↓ Ejecuta la descarga
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  /**
   * Filtrar en un array
   * @param value Valor a buscar
   * @param propertys Propiedad del objeto, se acepta un string o múltiples en un array
   * @param list Información a filtrar
   * @param notReferenced Estado para eliminar o mantener referencia del objeto
   * @param setValue Por si se va a dejar un valor que no este en el filtro, formato -> [estado,propiedad,valor]
   * @returns Retorna array filtrado
   */
  // arrayFilter = <T extends Array<any> | object>(
  //   value: any | number | string,
  //   propertys: string | string[] = "",
  //   list: Array<T>,
  //   notReferenced: boolean = true,
  //   setValue: [boolean, string, string] = [false, "", ""]
  // ): T => {
  //   let valueN = normalizeText(value);
  //   let data: any = [];

  //   if (valueN === "") {
  //     data = list;
  //   } else if (list instanceof Array && list.length > 0) {
  //     list
  //       .filter((o: any) =>
  //         Object.keys(o).some((k) => {
  //           if (propertys.includes(normalizeText(k)) || propertys === "") {
  //             if (!o[k]) {
  //               o[k] = "";
  //             }

  //             return normalizeText(o[k])
  //               ?.toString()
  //               ?.toLowerCase()
  //               ?.includes(valueN?.toLowerCase());
  //           } else {
  //             return null;
  //           }
  //         })
  //       )
  //       .forEach((elm) => {
  //         if (notReferenced) {
  //           data.push(this.getObjectNotReferenced(elm));
  //         } else {
  //           data.push(elm);
  //         }
  //       });
  //   }

  //   if (setValue[0]) {
  //     const foundItem = list.filter(
  //       (elm: any) => elm[setValue[1]] === setValue[2]
  //     );
  //     const validateIfExist = data.filter(
  //       (elm: any) => elm[setValue[1]] === setValue[2]
  //     );
  //     if (foundItem.length > 0 && validateIfExist.length === 0) {
  //       data.push(foundItem[0]);
  //     }
  //   }

  //   return data as T;
  // };

  /** Filtrar por multiples condiciones */
  arrayFilterByConditions = (arr: any, conditions: any) => {
    const newArr: any = [];

    arr?.forEach((elm: any) => newArr.push(this.getObjectNotReferenced(elm)));

    return newArr.filter((elm: any) =>
      Object.keys(conditions).every(
        (condition) => conditions[condition] === elm[condition]
      )
    );
  };

  /**
   * Obtener valores únicos de un array de objetos
   * @param list Array a filtrar
   * @param property Propiedad por la que voy a filtrar
   * @returns Array de valores únicos
   */
  getUniqueValueArray = (list: Array<any>, property?: string) =>
    Array.from(new Set(list.map((elm) => (property ? elm[property] : elm))));

  getHex = (color: any) => {
    const caracteres = "0123456789ABCDEF";
    let i = parseInt(color);
    if (i === 0 || isNaN(i)) return "00";
    i = Math.round(Math.min(Math.max(0, i), 255));
    return caracteres.charAt((i - (i % 16)) / 16) + caracteres.charAt(i % 16);
  };

  /** Convertir RGB a HEX */
  convertToHex = (rgb: string[]) =>
    `#${this.getHex(rgb[0]) + this.getHex(rgb[1]) + this.getHex(rgb[2])}`;

  /** Convertir HEX a RGB */
  convertToRGB = (hex: string) => {
    const color: any = [];
    color[0] = parseInt(hex.replace("#", "").substring(0, 2), 16);
    color[1] = parseInt(hex.replace("#", "").substring(2, 4), 16);
    color[2] = parseInt(hex.replace("#", "").substring(4, 6), 16);
    return color;
  };

  /** Generar gradiente de color */
  generateGradientColor = (
    colorStart: any,
    colorEnd: any,
    colorCount: any,
    alp = 0
  ) => {
    const start = this.convertToRGB(`#${colorStart}`);
    const end = this.convertToRGB(`#${colorEnd}`);

    let alpha = alp > 0.4 ? alp / 1.5 : alp;

    const colors: any = [];

    for (let i = 0; i < colorCount; i++) {
      const color: any = [];

      alpha += 0.6 / colorCount;

      color[0] = start[0] * alpha + (1 - alpha) * end[0];
      color[1] = start[1] * alpha + (1 - alpha) * end[1];
      color[2] = start[2] * alpha + (1 - alpha) * end[2];

      colors.push(this.convertToHex(color));
    }

    return colors;
  };

  addOrSubstractDate = (
    date: Date,
    type: "hour" | "day" | "month" | "year",
    count: number
  ) => {
    switch (type) {
      case "hour":
        return date.setHours(date.getHours() + count);
      case "day":
        return date.setDate(date.getDate() + count);
      case "month":
        return date.setMonth(date.getMonth() + count);
      case "year":
        return date.setFullYear(date.getFullYear() + count);
    }
  };

  calculateWidthTable = (width: number, variable = 0.68) =>
    width * variable + "vw";

  /**
   * Validar campo del formulario
   * @param form Formulario
   * @param field Nombre del campo
   * @param type Tipo de estado por defecto "invalid"
   * @returns Estado de la condición
   */
  validateFieldForm = (
    form?: FormGroup,
    field?: any,
    type: "invalid" | "valid" = "invalid"
  ): any => {
    if (typeof form == "object") {
      return (form?.get(field as string)?.[type] &&
        form.get(field as string)?.touched) as boolean;
    } else if (field) {
      return (field[type] && field?.touched) as boolean;
    }
  };

  textAreaAdjust = (event: any, typeElm: "Event" | "input" = "Event") => {
    const textAreaInstance = (
      typeElm === "Event" ? event.target : event
    ) as HTMLInputElement;
    textAreaInstance.style.height = `${2 + textAreaInstance.scrollHeight}px`;
  };

  formatTextWithBreakLinesAndSpaces = (value: string): string => {
    let newValue = value;
    const charactersToReplace = [
      {
        value: " ",
        replace: "&nbsp",
      },
      {
        value: "<",
        replace: "&lt",
      },
      {
        value: ">",
        replace: "&gt",
      },
      {
        value: "\n",
        replace: "<br>",
      },
    ];
    charactersToReplace.forEach(
      (character) =>
        (newValue = newValue?.replaceAll(character.value, character.replace))
    );
    return newValue;
  };

  calculateByDates = (
    initialDate: string | Date,
    finalDate: string | Date,
    type: "days"
  ) => {
    const timeInitialDate =
      typeof initialDate === "string"
        ? new Date(initialDate).getTime()
        : initialDate.getTime();
    const timeFinalDate =
      typeof finalDate === "string"
        ? new Date(finalDate).getTime()
        : finalDate.getTime();

    const difference = timeFinalDate - timeInitialDate;

    if (type === "days") {
      return difference / (1000 * 60 * 60 * 24);
    }

    return 0;
  };

  validateSuperateScroll = (event: any, scrollLimit: number) =>
    event?.target?.scrollTop > scrollLimit;

  validateLimitText = (event: any): boolean =>
    event?.scrollWidth > event?.clientWidth;

  getPropertysContainer = (container: any): HTMLElement =>
    container as HTMLElement;

  redirectPage = (url: string) =>
    setTimeout(() => {
      const protocol: string = window.location.protocol;
      const domain: string = window.location.hostname;
      const port: string = window.location.port;

      window.location.assign(`${protocol}//${domain}:${port}/${url}`);
    }, 0);
}

/**
 * Genera un Hash único que representa al objeto y sus propiedades, funcional para comparar cambios entre objetos
 * @param object
 * @returns
 */
export const calculateObjectHash = async (object: any) => {
  const formValue = JSON.stringify(object);
  const buffer = new TextEncoder().encode(formValue);
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

/**
 * Validar valores de entrada para campos de texto según una expresión regular
 * @param event Instancia del campo de texto
 * @param expression Expresión regular con la que se validará
 */
export const validateRegularExpression = (
  event: KeyboardEvent,
  expression: string,
  defaultValue: string = ""
) => {
  const value = (event.target as HTMLInputElement).value;

  const letters = value.split("");
  let valueResponse = "";

  if (letters.length === 0) {
    valueResponse = defaultValue;
  } else {
    letters.forEach((letter) => {
      let exp = new RegExp(expression);
      let apply = exp.test(letter.replace(/\n/g, ""));

      valueResponse += `${apply ? letter : ""}`;
    });
  }

  (event.target as HTMLInputElement).value = valueResponse;
};

export const validateRegularExpressionWithValue = (
  value: string,
  expression: string
): string => {
  const letters = value.split("");
  let valueResponse = "";

  if (letters.length === 0) {
    valueResponse = "";
  } else {
    letters.forEach((letter) => {
      let exp = new RegExp(`^(${expression})*$`, "igm");
      let apply = exp.test(letter.replace(/\n/g, ""));

      valueResponse += `${apply ? letter : ""}`;
    });
  }

  return valueResponse;
};

export const getErrorFieldForm = (
  field: FormControl | string,
  errorName: string,
  form?: FormGroup
) => {
  if (form) return form.get(field as string)?.errors?.[errorName];
  else return (field as FormControl).errors?.[errorName];
};

export const validateFieldForm = (
  field?: any,
  type: "invalid" | "valid" = "invalid",
  form?: FormGroup
) => {
  if (form)
    return (form?.get(field as string)?.[type] &&
      form.get(field as string)?.touched) as boolean;
  else return (field[type] && field?.touched) as boolean;
};

export const getValueFieldForm = (
  field: FormControl | string,
  form?: FormGroup
) => {
  if (form) return form.get(field as string)?.value;
  else return (field as FormControl)?.value;
};

export const setValueFieldForm = (
  field: FormControl | string,
  value: boolean,
  form?: FormGroup
) => {
  if (form) return form.get(field as string)?.setValue(value);
  else return (field as FormControl)?.setValue(value);
};

export const validateLimitText = (event: HTMLElement): boolean =>
  event?.scrollWidth > event?.clientWidth;

export const createArrayByNumber = (length: number): number[] =>
  Array.from({ length }, (_, i) => i);

export const trackByFunction = (keys?: string[]) => {
  return (index: number, item: any): any =>
    keys && keys?.length ? keys.map((key) => item[key]).join("-") : item;
};

/**
 * Verifica si una imagen carga correctamente
 * @param path Ubicación de la imagen
 */
export const checkImg = (path: string): Promise<string> =>
  new Promise<string>((res) => {
    const img = new Image();
    img.onload = () => res(path);
    img.onerror = () => res("");
    img.src = path;
  });

export const removeCircularReferences = (obj: any) => {
  const seen = new WeakSet();
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return; // Omitimos las referencias circulares
        }
        seen.add(value);
      }
      return value;
    })
  );
};

/**
 * Máximo valor de un array
 * @param arg Array
 * @param prop propiedad si los valores son objetos
 */
export const getMaxValue = (arg: any[], prop?: string) =>
  arg.reduce(
    (pre, cur) =>
      (prop ? +cur[prop] : +cur) < +pre ? +pre : prop ? +cur[prop] : +cur,
    0
  );

export const formatTextWithBreakLinesAndSpaces = (value: string): string => {
  let newValue = value;
  const charactersToReplace = [
    {
      value: " ",
      replace: "&nbsp",
    },
    {
      value: "<",
      replace: "&lt",
    },
    {
      value: ">",
      replace: "&gt",
    },
    {
      value: "\n",
      replace: "<br>",
    },
  ];
  charactersToReplace.forEach(
    (character) =>
      (newValue = newValue?.replaceAll(character.value, character.replace))
  );
  return newValue;
};

export const /**
   * Filtrar en un array
   * @param value Valor a buscar
   * @param propertys Propiedad del objeto, se acepta un string o múltiples en un array
   * @param list Información a filtrar
   * @param notReferenced Estado para eliminar o mantener referencia del objeto
   * @param setValue Por si se va a dejar un valor que no este en el filtro, formato -> [estado,propiedad,valor]
   * @returns Retorna array filtrado
   */
  arrayFilter = <T extends Array<any> | object>(
    list: Array<T>,
    value: any,
    propertys: string | string[]
  ): Array<T> => {
    let valueN = value;

    if (valueN === "") {
      return list;
    }
    return list?.filter((o: any) =>
      Object.keys(o).some((k) => {
        if (propertys.includes(k) || propertys === "") {
          if (!o[k]) {
            o[k] = "";
          }

          return o[k]
            ?.trim()
            ?.toString()
            ?.toLowerCase()
            ?.includes(valueN?.trim()?.toLowerCase());
        } else {
          return null;
        }
      })
    );
  };

export const replaceMentionsStatus = (
  content: string,
  status: boolean
): string => {
  const mentionRegex = /{{accountId:(\d+),new:(true|false)}}/g;
  return content.replace(mentionRegex, `{{accountId:$1,new:${status}}}`);
};

export const scrollToElement = (idElement: string, animation = true) => {
  const element = document.getElementById(idElement) as HTMLDivElement;
  if (element) {
    element.scrollIntoView({
      behavior: animation ? "smooth" : "instant",
      block: "center",
    });
  }
};
