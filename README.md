Dự án xây dựng một web để hỗ trợ quản lý cho một kho hàng.

Chức năng:
- Phân quyền người dùng admin, manager, shipper để hỗ trợ quản lý cho từng đối tượng
- Hỗ trợ admin quản lý users(admin, manager, shipper) và partners(supplier, customer)
- Hỗ trợ manager quản lý các đơn hàng(input, output), quản lý các sản phẩm trong kho
- Hỗ trợ shipper quản lý các đơn hàng đã nhận

Quy trình hoạt động của hệ thống:
- Admin quản lý thông tin của người khác trong hệ thống
  -Người dùng sẽ chia 2 loại là user và partner:
    -User là những người có thể dùng chức năng hệ thống. Họ sẽ được cung câp tài khoản để truy cập hệ thống với các quyền khác nhau. User gồm admin, manager, shipper
    -Partner là customer, supplier. Họ không sử dụng hệ thống và không có tài khoản
- Manager lên đơn hàng
  -Manager sẽ có thể quản lý các đơn hàng. Các đơn hàng gồm input và output. Với mỗi loại lại có đơn chi tiết inputInfo và outputInfo
  -Khi có đơn hàng thì manager sẽ tạo đơn, đơn này gồm idShipper, idCustomer(idSupplier), idManager, date
  -Sau đó manager sẽ truy cập vào đơn hàng để lên đơn chi tiết. Đơn chi tiết gồm id sản phẩm, số lượng, giá
  -Chỉ các manager tạo đơn hàng thì mới biết về đơn hàng
- Shipper nhận đơn
  -Sau khi đơn hàng được manager tạo ra, các shipper có id tương ứng sẽ được cập nhật các đơn hàng chi tiết của các đơn kia vào tài khoản, điều này giúp họ quản lý các đơn nhanh hơn
- Shipper giao hàng
  -Sau khi shipper giao hàng xong thì shipper sẽ có quyền sửa trạng thái các đơn hàng chi tiết, sau khi sửa trạng thái xong thì đơn đó sẽ biến mất khỏi tài khoản shipper
- Manager xác nhận giao hàng
  -Sau khi shipper chuyển đổi trạng thái đơn hàng chi tiết thì manager sẽ có thể biết được, điều này giúp họ biết đơn nào yêu cầu hoàn đơn và đơn nào giao xong 


Table database:
- users:
  id, name, phone, email, address, userName, password, role(admin, manager, shipper)
- partners:
  id, name, phone, email, address, role(customer, supplier)
- inputs:
  id, date, idShipper, idManager, idSupplier, address, status
- inputInfo:
  id, idInput, idProduct, quantity, price, status
- outputs:
  id, date, idShipper, idManager, idCustomer, address, status
- outputInfo:
  id, idOutput, idProduct, quantity, price, status
- products:
  id, name, code, category, quantity, description
