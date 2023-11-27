const prompt = require('prompt-sync')();

const user = {
  name: '',
  email: '',
  phone: '',
};

const deliveryInfo = {
  delivery_price: 500,
  from: "Ваша адреса",
  to: '',
};

const menuItems = [
  { ID: '1', title: 'суші', price: 220, category: 'філадельфія', ingredients: ['рис',  'лосось слабосолений', 'норі', 'крем сир', 'огірок'] },
  { ID: '2', title: 'суші', price: 349, category: 'червоний дракон', ingredients: ['рис', 'норі', 'вугор', 'авокадо', 'крем сир', 'ікра', 'лосось слабосолений'] },
  { ID: '2', title: 'нігірі', price: 50, category: 'нігірі креветка', ingredients: ['рис', 'креветка', 'японський майонез'] },
  { ID: '2', title: 'сет суші', price: 1500, category: 'сет чотири дракони', ingredients: ['чорний дракон', 'червоний дракон', 'зелений дракон', 'жовтий дракон'] },
  
];

const currentOrder = {
  ...user,
  ...deliveryInfo,
  dishes: [],
  finalPrice: 0,
  status: 'Готується',
};


function enterUserInfo() {
  currentOrder.name = prompt('Введіть ваше ім\'я: ');
  currentOrder.email = prompt('Введіть ваш email: ');
  currentOrder.phone = prompt('Введіть ваш номер телефону: ');
  currentOrder.to = prompt('Введіть адресу доставки: ');
}

function calculateOrderPrice() {
  let total = 0;

  for (const dish of currentOrder.dishes) {
    total += dish.price;
  }

  currentOrder.finalPrice = total + deliveryInfo.delivery_price;
}

function displayOrderSummary() {
  console.log('------ Замовлення ------');
  console.log(`Ім'я: ${currentOrder.name}`);
  console.log(`Email: ${currentOrder.email}`);
  console.log(`Телефон: ${currentOrder.phone}`);
  console.log(`Адреса доставки: ${currentOrder.to}`);
  console.log('------ Страви ------');

  for (const dish of currentOrder.dishes) {
    console.log(`Назва: ${dish.title}, Ціна: ${dish.price}`);
  }

  console.log('------ Загальна вартість ------');
  console.log(`Вартість страв: ${currentOrder.finalPrice - deliveryInfo.delivery_price}`);
  console.log(`Вартість доставки: ${deliveryInfo.delivery_price}`);
  console.log(`Загальна вартість: ${currentOrder.finalPrice}`);
  console.log(`Статус: ${currentOrder.status}`);
  console.log('------------------------');
}

function handleUser() {
  displayMenu();
  processUserOrder();
}

function displayMenu() {
  for (const item of menuItems) {
    console.log(`ID: ${item.ID}\nTitle: ${item.title}\nPrice: ${item.price}\nCategory: ${item.category}\nIngredients: ${item.ingredients.join(', ')}\n`);
  }
}

function processUserOrder() {
  let userInputDish;
  let words;
  let additionalOrder = '1';

  do {
    userInputDish = prompt('Оберіть ID вашого замовлення. Щоб замовити декілька замовлень введіть ID через пробіл. Щоб обрати одну страву декілька раз, введіть ID потрібну вам кількість раз: ');
    words = userInputDish.split(' ');

    for (const word of words) {
      const foundItem = menuItems.find(item => item.ID === word);

      if (foundItem) {
        console.log(`Ви замовили ${foundItem.title}`);
        currentOrder.dishes.push(foundItem);
      } else {
        console.log(`Помилка: товар з ID ${word} не знайдений у меню.`);
      }
    }

    additionalOrder = prompt('Бажаєте додати ще страви до замовлення? Введіть 1, якщо так, або 2 - якщо ні ');
  } while (additionalOrder === '1');

  enterUserInfo();
  calculateOrderPrice();
  displayOrderSummary();
}

function handleAdmin() {
  interactWithAdministrator();
}

function interactWithAdministrator() {
  let adminAction;

  do {
    adminAction = prompt('Якщо бажаєте переглянути замовлення клацніть -- 1, якщо бажаєте змінити статус замовлення -- 2, якщо бажаєте вийти з ролі адміністратора -- 3: ');

    switch (adminAction) {
      case '1':
        displayOrderSummary();
        break;
      case '2':
        changeOrderStatus();
        break;
      case '3':
        console.log('Ви вийшли з режиму адміністратора');
        break;
      default:
        console.log('Неправильний вибір. Будь ласка, оберіть 1, 2 або 3.');
        break;
    }
  } while (adminAction !== '3');
}

function changeOrderStatus() {
  let newStatus;

  do {
    newStatus = prompt("Оновити статус замовлення: 1 -- замовлення готується, 2 -- замовлення в дорозі, 3 -- замовлення доставлено, 4 -- схоже щось пішло не там, 5 -- нічого не міняти: ");

    switch (newStatus) {
      case '1':
        currentOrder.status = 'замовлення готується';
        break;
      case '2':
        currentOrder.status = 'замовлення в дорозі';
        break;
      case '3':
        currentOrder.status = 'замовлення доставлено';
        break;
      case '4':
        currentOrder.status = 'схоже щось пішло не так';
        break;
      case '5':
        console.log('Статус замовлення залишається незмінним');
        break;
      default:
        console.log('Невірний вибір. Статус замовлення залишається незмінним.');
        break;
    }
  } while (newStatus !== '5');

  console.log('Теперішній статус замовлення: ' + currentOrder.status);
}

initiateProgram();

function initiateProgram() {
  let userChoice;

  do {
    userChoice = prompt('Оберіть: 1 - ввійти як користувач, 2 - ввійти як адмін, 3 -- вийти з програми: ');

    switch (userChoice) {
      case '1':
        handleUser();
        break;
      case '2':
        handleAdmin();
        break;
      case '3':
        console.log('Гарного дня');
        break;
      default:
        console.log('Щось пішло не так. Будь ласка, оберіть 1, 2 або 3.');
        break;
    }
  } while (userChoice !== '3');
}
