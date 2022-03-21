import { ReactNode, useState } from 'react';
import './App.css';
import { faker } from '@faker-js/faker';
import { AnimatePresence, motion } from 'framer-motion';

// TODO try making each Item a Material Card, see if it still works

const name = () => faker.name.findName();
const initialItems = [name(), name(), name()];

function App() {
  const [items, setItems] = useState<string[]>(initialItems);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const handleAdd = () => {
    setItems([faker.name.findName(), ...items]);
  };
  const handleRemove = () => {
    setItems([...items].slice(1));
  };
  const handleSort = () => {
    setIsSorted(!isSorted);
  };
  const handleReset = () => {
    setItems(initialItems);
  };

  const sortAlphabitical = (a: string, b: string) => {
    if (!isSorted) return 0;

    return a.localeCompare(b);
  };

  return (
    <div className='App'>
      <div className='buttons'>
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleRemove}>Remove</button>
        <button onClick={handleSort}>Sort</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <AnimatePresence>
        <h1>hello</h1>
        {[...items].sort(sortAlphabitical).map((item, key) => {
          return <Item key={item}>{item}</Item>;
        })}
      </AnimatePresence>
    </div>
  );
}

const Item = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const animations = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 1 },
  };

  return (
    <motion.h1 {...animations} layout>
      {children}
    </motion.h1>
  );
};

export default App;
