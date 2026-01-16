import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Product {
  id: number;
  name: string;
  article: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('main');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Здравствуйте! Я помощник магазина автозапчастей. Чем могу помочь?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const recommendedProducts: Product[] = [
    {
      id: 1,
      name: 'Масляный фильтр Mann W712/73',
      article: 'W712/73',
      price: 450,
      image: '🔧',
    },
    {
      id: 2,
      name: 'Воздушный фильтр Bosch F026400201',
      article: 'F026400201',
      price: 890,
      image: '🌬️',
    },
    {
      id: 3,
      name: 'Тормозные колодки Brembo P85020',
      article: 'P85020',
      price: 3200,
      image: '🛑',
    },
  ];

  const catalogProducts: Product[] = [
    ...recommendedProducts,
    {
      id: 4,
      name: 'Свечи зажигания NGK BKR6E',
      article: 'BKR6E',
      price: 320,
      image: '⚡',
    },
    {
      id: 5,
      name: 'Антифриз Total Glacelf -40°C 5л',
      article: 'GLACELF5',
      price: 1450,
      image: '❄️',
    },
    {
      id: 6,
      name: 'Ремень ГРМ Gates 5521XS',
      article: '5521XS',
      price: 2890,
      image: '🔄',
    },
  ];

  const orderHistory = [
    { id: 1, date: '15.01.2026', items: 3, total: 4540, status: 'Доставлен' },
    { id: 2, date: '08.01.2026', items: 2, total: 1340, status: 'В пути' },
    { id: 3, date: '28.12.2025', items: 5, total: 8900, status: 'Доставлен' },
  ];

  const faqItems = [
    {
      question: 'Как оформить заказ?',
      answer: 'Выберите нужные запчасти в каталоге, добавьте в корзину и оформите заказ. Мы свяжемся с вами для подтверждения.',
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Принимаем оплату картой онлайн, наличными при получении или банковским переводом для юридических лиц.',
    },
    {
      question: 'Сколько времени занимает доставка?',
      answer: 'По Москве - 1-2 дня, по России - 3-7 дней. Точные сроки зависят от наличия товара на складе.',
    },
    {
      question: 'Можно ли вернуть товар?',
      answer: 'Да, возврат возможен в течение 14 дней при наличии заводской упаковки и товарного вида.',
    },
  ];

  const menuItems = [
    { id: 'main', label: 'Главное меню', icon: 'Home' },
    { id: 'catalog', label: 'Каталог товаров', icon: 'Package' },
    { id: 'cart', label: 'Корзина', icon: 'ShoppingCart' },
    { id: 'orders', label: 'История заказов', icon: 'ShoppingBag' },
    { id: 'faq', label: 'Частые вопросы', icon: 'HelpCircle' },
    { id: 'support', label: 'Техподдержка', icon: 'Headphones' },
    { id: 'profile', label: 'Личный кабинет', icon: 'User' },
  ];

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: 'Спасибо за ваше сообщение! Специалист ответит вам в ближайшее время.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  const renderMainMenu = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Добро пожаловать!
        </h2>
        <p className="text-muted-foreground">Выберите раздел для продолжения</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {menuItems.slice(1).map((item) => (
          <Card
            key={item.id}
            className="cursor-pointer hover:scale-105 transition-all hover:shadow-lg hover:shadow-primary/20 bg-card/50 backdrop-blur relative"
            onClick={() => setActiveSection(item.id)}
          >
            {item.id === 'cart' && getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-secondary">
                {getTotalItems()}
              </Badge>
            )}
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name={item.icon} className="text-white" size={24} />
              </div>
              <CardTitle className="text-lg">{item.label}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-primary" />
            Рекомендации для вас
          </CardTitle>
          <CardDescription>На основе вашей истории заказов</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur hover:bg-card/70 transition-colors"
            >
              <div className="text-4xl">{product.image}</div>
              <div className="flex-1">
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-xs text-muted-foreground">Артикул: {product.article}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{product.price} ₽</p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs hover:bg-primary/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  <Icon name="Plus" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderCatalog = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Input placeholder="Поиск по артикулу или названию..." className="flex-1" />
        <Button>
          <Icon name="Search" size={18} />
        </Button>
      </div>

      <div className="grid gap-3">
        {catalogProducts.map((product) => (
          <Card key={product.id} className="bg-card/50 backdrop-blur hover:shadow-md transition-shadow">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="text-4xl">{product.image}</div>
              <div className="flex-1">
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-xs text-muted-foreground mb-1">Артикул: {product.article}</p>
                <p className="font-bold text-primary">{product.price} ₽</p>
              </div>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-secondary"
                onClick={() => addToCart(product)}
              >
                <Icon name="Plus" size={16} className="mr-1" />В корзину
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCart = () => (
    <div className="space-y-4 animate-fade-in">
      {cart.length === 0 ? (
        <Card className="bg-card/50 backdrop-blur">
          <CardContent className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Icon name="ShoppingCart" size={40} className="text-muted-foreground" />
            </div>
            <p className="text-lg font-medium mb-2">Корзина пуста</p>
            <p className="text-sm text-muted-foreground mb-4">Добавьте товары из каталога</p>
            <Button onClick={() => setActiveSection('catalog')} className="bg-gradient-to-r from-primary to-secondary">
              Перейти в каталог
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {cart.map((item) => (
              <Card key={item.id} className="bg-card/50 backdrop-blur">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{item.image}</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Артикул: {item.article}</p>
                      <p className="font-bold text-primary mt-1">{item.price} ₽</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Icon name="Trash2" size={16} className="text-destructive" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-sm text-muted-foreground">Количество:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Icon name="Minus" size={14} />
                      </Button>
                      <span className="font-bold w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>
                    <span className="ml-auto font-bold text-lg">{item.price * item.quantity} ₽</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 sticky bottom-20">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товаров:</span>
                  <span className="font-medium">{getTotalItems()} шт.</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Итого:</span>
                  <span className="text-2xl font-bold text-primary">{getTotalPrice()} ₽</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-primary to-secondary h-12 text-base" size="lg">
                <Icon name="CreditCard" size={20} className="mr-2" />
                Оформить заказ
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-4 animate-fade-in">
      {orderHistory.map((order) => (
        <Card key={order.id} className="bg-card/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Заказ #{order.id}</CardTitle>
              <Badge variant={order.status === 'Доставлен' ? 'default' : 'secondary'}>{order.status}</Badge>
            </div>
            <CardDescription>{order.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Товаров: {order.items} шт.</span>
              <span className="font-bold text-primary">{order.total} ₽</span>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              Подробнее
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderFAQ = () => (
    <div className="space-y-3 animate-fade-in">
      {faqItems.map((item, index) => (
        <Card key={index} className="bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-base flex items-start gap-2">
              <Icon name="HelpCircle" className="text-primary mt-1 flex-shrink-0" size={18} />
              {item.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{item.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-4 animate-fade-in">
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Headphones" className="text-primary" />
            Техническая поддержка
          </CardTitle>
          <CardDescription>Мы всегда рады помочь вам</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50">
            <Icon name="Phone" className="text-secondary" />
            <div>
              <p className="font-medium">Телефон</p>
              <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50">
            <Icon name="Mail" className="text-primary" />
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-muted-foreground">support@parts-store.ru</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50">
            <Icon name="Clock" className="text-secondary" />
            <div>
              <p className="font-medium">Режим работы</p>
              <p className="text-sm text-muted-foreground">Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-18:00</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-base">Онлайн-чат</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 mb-4 p-4 rounded-lg bg-background/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-white'
                      : 'bg-card text-foreground'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex gap-2">
            <Input
              placeholder="Напишите сообщение..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Icon name="Send" size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-4 animate-fade-in">
      <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
            <Icon name="User" className="text-white" size={40} />
          </div>
          <CardTitle>Иван Петров</CardTitle>
          <CardDescription>ivan.petrov@example.com</CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-base">Статистика</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Всего заказов</span>
            <span className="font-bold text-xl text-primary">12</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Сумма покупок</span>
            <span className="font-bold text-xl text-secondary">45 890 ₽</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Бонусов</span>
            <span className="font-bold text-xl text-primary">450</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        {['Редактировать профиль', 'Адреса доставки', 'Способы оплаты', 'Уведомления'].map((item, index) => (
          <Button key={index} variant="outline" className="justify-start h-auto py-3">
            <Icon name="Settings" size={18} className="mr-2" />
            {item}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'catalog':
        return renderCatalog();
      case 'cart':
        return renderCart();
      case 'orders':
        return renderOrders();
      case 'faq':
        return renderFAQ();
      case 'support':
        return renderSupport();
      case 'profile':
        return renderProfile();
      default:
        return renderMainMenu();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-2xl mx-auto p-4 pb-20">
        <div className="mb-6 flex items-center justify-between">
          {activeSection !== 'main' && (
            <Button variant="ghost" size="icon" onClick={() => setActiveSection('main')} className="animate-fade-in">
              <Icon name="ArrowLeft" />
            </Button>
          )}
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex-1 text-center">
            {menuItems.find((item) => item.id === activeSection)?.label || 'Автозапчасти'}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setActiveSection('cart')}
          >
            <Icon name="ShoppingCart" />
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-primary to-secondary">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        </div>

        {renderContent()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border">
        <div className="max-w-2xl mx-auto px-4 py-2">
          <div className="flex justify-around">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                size="sm"
                className="flex flex-col items-center gap-1 h-auto py-2 px-3 relative"
                onClick={() => setActiveSection(item.id)}
              >
                {item.id === 'cart' && getTotalItems() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-gradient-to-r from-primary to-secondary">
                    {getTotalItems()}
                  </Badge>
                )}
                <Icon name={item.icon} size={20} />
                <span className="text-xs">{item.label.split(' ')[0]}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
