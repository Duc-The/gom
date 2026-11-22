import { Link } from "react-router-dom";

import { Benefits } from "@/components/common/ShopUI";

const hero =
  "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1400&q=90";
export default function About() {
  return (
    <div className="container section">
      <div className="page-heading">
        <div className="eyebrow">CHUYỆN TIỆM GỐM CHO EM</div>
        <h1>
          Gốm cũ.
          <br />
          <em>Một đời sống mới.</em>
        </h1>
        <p>Từ những điều giản dị, chúng mình gom lại một chút bình yên.</p>
      </div>
      <div className="story-grid">
        <img className="rounded-img" src={hero} alt="Câu chuyện gốm mộc" />
        <div>
          <h2>
            Mỗi món được chọn,
            <br />
            vì một nét riêng.
          </h2>
          <p>
            Gốm Cho Em là tiệm gốm secondhand tại Đà Nẵng. Có món chỉ duy nhất
            một chiếc, có mẫu còn đôi ba chiếc giống nhau. Mỗi món đều được ghi
            nhận tình trạng để bạn chọn thật an tâm.
          </p>
          <p>
            Chúng mình mong chiếc bát, chiếc đĩa không chỉ nằm trên kệ, mà được
            dùng trong những bữa cơm và những buổi trà mỗi ngày.
          </p>
          <Link className="btn" to="/san-pham">
            Tìm món gốm của bạn
          </Link>
        </div>
      </div>
      <Benefits />
    </div>
  );
}
