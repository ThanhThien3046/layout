Đầu tiên là không đc push node_modules lên git, vì ng khác pull về sẽ nặng

để xóa xóa thì xóa thông thường phải tuân thủ theo bài hướng dẫn này : 
https://ebudezain.com/cach-xoa-bo-nho-dem-git-git-cache-git-ignore-not-working
cụ thể là anh đã chạy lệnh sau: 
git rm --cached node_modules/*  
git rm --cached package-lock.json 

sau đó thêm file .gitignore
