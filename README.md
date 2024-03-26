Table database:
- users:
  id, name, phone, email, address, userName, password, role(admin, manager, shipper)
- partners:
  id, name, phone, email, address, role(customer, supplier)
- inputs:
  id, date, idShipper, idManager, idSupplier, address, status
- inputInfo:
  id, idProduct, quantity, price, status
- outputs:
  id, date, idShipper, idManager, idCustomer, address, status
- outputInfo:
  id, idProduct, quantity, price, status
