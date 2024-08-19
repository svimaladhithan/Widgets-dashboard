import { Button, Drawer } from "flowbite-react";
import { useState } from "react";

import React from "react";

const WidgetFilter = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  return (
    <div>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>Show right drawer</Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Drawer" />
        <Drawer.Items></Drawer.Items>
      </Drawer>
    </div>
  );
};

export default WidgetFilter;
