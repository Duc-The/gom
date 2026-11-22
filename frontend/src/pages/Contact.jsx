import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ChevronRight,
  Camera as Instagram,
  MapPin,
  Upload,
} from "lucide-react";
import { useRemote } from "@/hooks/useRemote";
import { useAuth } from "@/stores/shop.store";
import { post, upload } from "@/services/api/client";

import { Benefits } from "@/components/common/ShopUI";

export default function Contact() {
  const settings = useRemote("/shop/settings").data;
  const user = useAuth((s) => s.user);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    const form = e.currentTarget;
    const f = new FormData(form);
    try {
      let imageUrl = "";
      const file = f.get("image");
      if (file?.size) {
        if (!user)
          throw new Error(
            "Đăng nhập để gửi ảnh tham khảo, hoặc bỏ ảnh để gửi lời nhắn.",
          );
        imageUrl = (await upload(file)).url;
      }
      await post("/shop/inquiries", {
        name: f.get("name"),
        phone: f.get("phone"),
        email: f.get("email"),
        topic: f.get("topic"),
        message: f.get("message"),
        imageUrl,
      });
      setSent(true);
      form.reset();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="container section">
      <div className="breadcrumbs">
        <Link to="/">Trang chủ</Link>
        <ChevronRight size={13} /> Liên hệ & ghé tiệm
      </div>
      <div className="page-heading">
        <div className="eyebrow">KẾT NỐI CÙNG GỐM CHO EM</div>
        <h1>
          Gửi chút tâm tình,
          <br />
          hoặc ghé uống <em>tách trà ấm.</em>
        </h1>
        <p>
          Bạn muốn soi một nét men, tìm một món gốm hay hỏi thăm tiệm?
          <br />
          Chúng mình luôn sẵn lòng lắng nghe.
        </p>
      </div>
      <div className="contact-grid">
        <form className="panel contact-form" onSubmit={submit}>
          <div className="eyebrow">HỘP THƯ GỐM MỘC</div>
          <h2>Gửi lời nhắn cho tiệm</h2>
          {sent && (
            <div className="notice success">
              Tiệm đã nhận lời nhắn. Chúng mình sẽ liên hệ qua thông tin bạn để
              lại.
            </div>
          )}
          <div className="form-grid">
            <label>
              Họ và tên *
              <input
                name="name"
                required
                maxLength={100}
                placeholder="Tiệm gọi bạn là…"
              />
            </label>
            <label>
              Điện thoại / Zalo *
              <input
                name="phone"
                required
                maxLength={20}
                placeholder="Số điện thoại liên hệ"
              />
            </label>
          </div>
          <label>
            Email
            <input name="email" type="email" placeholder="ban@example.com" />
          </label>
          <label>
            Bạn quan tâm đến
            <select name="topic">
              <option>Tư vấn món gốm</option>
              <option>Tìm mẫu gốm</option>
              <option>Hẹn ghé tiệm</option>
              <option>Đơn hàng & đổi trả</option>
            </select>
          </label>
          <label>
            Lời nhắn *
            <textarea
              name="message"
              required
              maxLength={5000}
              rows={5}
              placeholder="Chia sẻ với tiệm một chút nhé…"
            />
          </label>
          <label className="file-upload">
            <Upload size={20} />
            <span>Thêm ảnh tham khảo · tối đa 15MB</span>
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp"
            />
          </label>
          <button className="btn" disabled={busy}>
            {busy ? "Đang gửi…" : "Gửi lời nhắn"}
          </button>
        </form>
        <div className="contact-side">
          <div className="eyebrow">LỜI MỜI TỪ TIỆM</div>
          <h2>
            Ghé chơi,
            <br />
            ngắm gốm & uống trà.
          </h2>
          <p>
            Một góc nhỏ tại Đà Nẵng, nơi những món gốm cũ chờ một người bạn mới.
          </p>
          <p>
            <MapPin size={18} /> {settings?.address || "Đà Nẵng, Việt Nam"}
          </p>
          <a
            className="btn secondary"
            href="https://www.instagram.com/gomchoem/"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={18} /> Nhắn tiệm trước khi ghé
          </a>
          <div className="map-card">
            <MapPin size={40} strokeWidth={1} />
            <h3>{settings?.openingHours || "Hẹn bạn tại Đà Nẵng"}</h3>
            <p>
              Nhắn Instagram để tiệm gửi địa chỉ,
              <br />
              giờ mở cửa và hướng dẫn ghé thăm.
            </p>
          </div>
          {settings?.address && (
            <a
              className="text-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={16} />
              Chỉ đường đến tiệm trên Google Maps
            </a>
          )}
          {settings?.phone && (
            <p>
              <a href={`tel:${settings.phone}`}>Hotline: {settings.phone}</a>
            </p>
          )}
          <p className="muted">Nhắn Instagram để tiệm hướng dẫn ghé thăm.</p>
        </div>
      </div>
      <Benefits />
    </div>
  );
}
