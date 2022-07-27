---
title: 'RSA Digital Signature'
date: 'July 9, 2022'
excerpt: 'Chữ kí số (Digital Signature) là những thông tin đi kèm với dữ liệu nhằm chứng thực nguồn gốc và nội dung của văn bản. Chữ kí số được dựa trên cơ sở lý thuyết hệ mã hoá công khai (public key cryptography'
cover_image: '/images/posts/img9.jpg'
embedded_program : False
---
# Giới thiệu
## Khái niệm 
Chữ kí số (Digital Signature) là những thông tin đi kèm với dữ liệu nhằm chứng thực nguồn gốc và nội dung của văn bản. Chữ kí số được dựa trên cơ sở lý thuyết hệ mã hoá công khai (public key cryptography), còn gọi là mã hóa bất đối xứng (asymetric cryptography), được tạo ra để giải quyết câu hỏi: “Làm thế nào để định nghĩa một chữ ký cho các văn bản số, với các tính chất tương tự như chữ ký viết tay ?”
Mã hóa công khai: Sử dụng 2 khóa có quan hệ toán học với nhau, khóa công khai (public key dùng để mã hóa, được công bố rộng rãi. Khóa còn lại là khóa bí mật (private key) dùng để giải mã, được giữ bí mật.
Mã hóa bất đối xứng: Cơ sở toán học của hệ mã hóa bất đối xứng là dùng những hàm một chiều, tức là những hàm để tính theo chiều thuận thì dễ còn theo chiều ngược lại thì với không khả thi với hệ thống máy tính hiện tại.
Chữ ký số bao gồm 3 thành phần:
1. Thuật toán tạo ra khóa.
2. Hàm tạo chữ ký là hàm tính toán chữ ký trên cơ sở khóa mật và dữ liệu cần ký.
3. Hàm kiểm tra chữ ký là hàm kiểm tra xem chữ ký đã cho có đúng với khóa công cộng không. (Khóa này mọi người có quyền truy cập cho nên mọi người đều có thể kiểm tra được chữ ký).
## Yêu cầu 
- Tính xác thực: người nhận có thể chứng minh được văn bản được ký bởi gửi. 
- Tính toàn vẹn: người nhận có thể chứng minh được không có ai sửa đổi văn bản đã được ký. 
- Không thể tái sử dụng: mỗi chữ ký chỉ có giá trị trên 1 văn bản.
- Không thể giả mạo.
- Chống từ chối: người gửi không thể phủ nhận được hành động ký vào văn bản.
## Tính chất chữ kí số
1. Là một chuỗi ký tự, có nội dung phụ thuộc vào nội dung bản tin được ký: khó thay đổi, khó dùng lại. Do đó có thể xác thực nội dung bản tin được ký
![](/images/blog/rsa-digital-signature/tc1.jpg)
2. Sử dụng thông tin mà chỉ có người ký mới có: Khó giả mạo, khó chỗi từ. Do đó có thể xác minh người ký
![](/images/blog/rsa-digital-signature/tc2.jpg)
3. Gần như không thể giả mạo chữ ký
![](/images/blog/rsa-digital-signature/tc3.jpg)
# Sơ đồ thuật toán chữ kí số
## Quá trình ký
Thông điệp sẽ được ký bằng cách mã hóa văn bản bằng khóa riêng (Private key) với thuật toán mã hóa RSA. Kết quá chữ ký số (Digital signature) của thông điệp sẽ là bản mã của thông điệp.  Nếu để mã hóa 1 thông điệp dài thì sẽ tốn rất nhiều thời gian trong cả việc mã hóa, giải mã và truyền tin, vì vậy trước khi đưa văn bản để mã hóa, người ta sẽ tính toán trước 1 chuỗi đại diện (hash value) của thông điệp sử dụng một giải thuật băm (Hashing Algorithm) SHA-1 hoặc MD5.
Sau đó thông điệp ban đầu sẽ được ghép với chữ ký số tạo thành thông điệp đã được ký.
Thông điệp đã được ký sẽ được gửi cho người nhận.
![drawing](/images/blog/rsa-digital-signature/kyrsa.jpg)
## Quá trình kiểm tra
Bên nhận sẽ tách phần chữ ký số RSA và thông điệp đã ký để xử lý.
Tính toán chuỗi đại diện MD1 (Message digest) của thông điệp gốc sử dụng giải thuật băm (là giải thuật sử dụng trong quá trình ký là SHA-1).
Sử dụng khóa công khai (Public key) của người gửi để giải mã chữ ký số RSA => chuỗi đại diện thông điệp MD2.
So sánh MD1 và MD2:
- Nếu MD1 = MD2 => chữ ký kiểm tra thành công. Thông điệp đảm bảo tính toàn vẹn và thực sự xuất phát từ người gửi (do khóa công khai được chứng thực).
- Nếu MD1 !=ojbv  MD2 => chữ ký không hợp lệ. Thông điệp có thể đã bị sửa đổi hoặc không thực sự xuất phát từ người gửi.
![drawing](/images/blog/rsa-digital-signature/ktrsa.jpg)