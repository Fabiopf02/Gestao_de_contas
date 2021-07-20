import { ICard, Item } from '../components/Card';

function formatItems(items: Item[]) {
  let text = '';
  items.map(item => {
    const { title, type, value, finished } = item;
    text += `- ${title}\n  R$ ${value.toFixed(2)}   ${
      finished ? 'Pago' : 'Pendente'
    }   ${type === 'entry' ? '+' : '-'}\n`;
  });
  return text;
}

export function getBalance(items: Item[], f?: boolean) {
  let total = 0;
  let exit = 0;
  let exitCounter = 0;
  let entry = 0;
  let entryCounter = 0;
  items.map(item => {
    if (f !== undefined && f !== item.finished) {
      return;
    }
    let v = item.value;

    v = item.type === 'entry' ? v : v * -1;

    if (item.type === 'entry') {
      entry += v;
      entryCounter += 1;
    }
    if (item.type === 'exit') {
      exit += v;
      exitCounter += 1;
    }
    total += v;
  });
  return {
    total: total.toFixed(2),
    entry,
    exit,
    entryCounter,
    exitCounter,
  };
}

export function formatString(card: ICard) {
  const text = `Título: ${card.title}\nDescrição: ${
    card.description.length > 0 ? card.description : '-'
  }\nTransações:\n${formatItems(card.items)}\n\nSaldo (estimado): R$ ${
    getBalance(card.items).total
  }\nPago: R$ ${getBalance(card.items, true).total}\nPendente: R$ ${
    getBalance(card.items, false).total
  }\n\nData Limite: ${
    card.deadline?.toLocaleDateString() || 'Não definido'
  }\nCriado em: ${card.created_at.toLocaleDateString()} - ${card.created_at.toLocaleTimeString()}
  `;
  return text;
}
