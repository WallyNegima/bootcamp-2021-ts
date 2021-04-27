type LabelString = "お名前" | "メールアドレス" | "電話番号" | "ご住所" | "ご希望の返信方法" | "連絡可能な時間帯（電話）" | "お問い合せの種類" | "お問い合せ内容";
type InputTypeString =  "radio" | "checkbox" | "tel" | "email" | "text";
type RadioInputItem =  {
  name: string;
  tagName: "input";
  type: "radio";
  label: LabelString;
  values: { label: string; value: number }[];
}
type CheckboxInputItem =  {
  name: string;
  tagName: "input";
  type: "checkbox";
  label: LabelString;
  values: { label: string; value: number }[];
}
type TextInputItem = {
  name: string;
  tagName: "input";
  type: "tel" | "email" | "text";
  label: LabelString;
  placeholder: string;
}

type InputItem =  TextInputItem | RadioInputItem | CheckboxInputItem;
type SelectItem = {
  name: string;
  tagName: "select";
  label: LabelString;
  options: { text: string; value: number }[];
}
type TextAreaItex = {
  name: string;
  tagName: "textarea";
  label: LabelString;
  placeholder: string;
}
type Item = InputItem | SelectItem | TextAreaItex;

const items: Item[] = [
  {
    name: "name",
    label: "お名前",
    tagName: "input",
    type: "text",
    placeholder: "例）山田　太郎",
  },
  {
    name: "email",
    label: "メールアドレス",
    tagName: "input",
    type: "email",
    placeholder: `例）example@gmail.com`,
  },
  {
    name: "tel",
    label: "電話番号",
    tagName: "input",
    type: "tel",
    placeholder: "例）080-1234-5678",
  },
  {
    name: "address",
    label: "ご住所",
    tagName: "input",
    type: "text",
    placeholder: "例）東京都千代田区丸の内1丁目9-2",
  },
  {
    name: "contact",
    label: "ご希望の返信方法",
    tagName: "input",
    type: "radio",
    values: [
      { label: "メール", value: 0 },
      { label: "電話", value: 1 },
      { label: "どちらでも可", value: 2 },
    ],
  },
  {
    name: "time",
    label: "連絡可能な時間帯（電話）",
    tagName: "input",
    type: "checkbox",
    values: [
      { label: "09:00〜12:00", value: 0 },
      { label: "13:00〜16:00", value: 1 },
      { label: "16:00〜19:00", value: 2 },
    ],
  },
  {
    name: "inquiry_kind",
    label: "お問い合せの種類",
    tagName: "select",
    options: [
      { text: "返品について", value: 0 },
      { text: "発送について", value: 1 },
      { text: "その他", value: 2 },
    ],
  },
  {
    name: "inquiry_detail",
    label: "お問い合せ内容",
    tagName: "textarea",
    placeholder: "例）お問い合わせ内容詳細をご記入ください",
  },
];

// _____________________________________________________________________________
//

function createInputRow(item: TextInputItem) {
  return `
    <tr>
      <th>
      ${item.label}
      </th>
      <td>
        <input name=${item.name} placeholder=${item.placeholder} />
      </td>
    </tr>
  `;
}

function createRadioInputRow(item: RadioInputItem) {
  return `
    <tr>
      <th>
      ${item.label}
      </th>
      <td>
       ${item.values.map((v,idx) => {
         return `
          <input id=${item.name+idx} name=${item.name} type="radio" value=${v.value}>
          <label for=${item.name+idx}>${v.label}</label>`
        }).join("")}
      </td>
    </tr>
  `;
}

function createCheckboxInputRow(item: CheckboxInputItem) {
  return `
    <tr>
      <th>
      ${item.label}
      </th>
      <td>
      ${item.values.map((v,idx) => {
        return `
         <input id=${item.name+idx} name=${item.name} type="checkbox" value=${v.value}>
         <label for=${item.name+idx}>${v.label}</label>`
       }).join("")}
      </td>
    </tr>
  `;
}

function createSelectRow(item: SelectItem) {
  return `
    <tr>
      <th>
      ${item.label}
      </th>
      <td>
        <select name=${item.name}>
        ${item.options.map(o => {
          return `<option value=${o.value}>${o.text}</option>`
        })}
        </select>
      </td>
    </tr>
  `;
}

function createTextAreaRow(item: TextAreaItex) {
  return `
    <tr>
      <th>
       ${item.label}
      </th>
      <td>
        <textarea name=${item.name} placeholder=${item.placeholder}></textarea>
      </td>
    </tr>
  `;
}

function createTable() {
  const list = items
    .map((item) => {
      switch (item.tagName) {
        case "input":
          switch (item.type) {
            case "radio":
              return createRadioInputRow(item);
            case "checkbox":
              return createCheckboxInputRow(item);
            default:
              return createInputRow(item);
          }
        case "select":
          return createSelectRow(item);
        case "textarea":
          return createTextAreaRow(item);
      }
    })
    .join("");
  return `<table>${list}</table>`;
}

function createFormDom() {
  const form = document.getElementById("form");

  if (form != null) form.innerHTML = createTable();
}

createFormDom();
