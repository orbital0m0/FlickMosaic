import { ReactElement } from 'react';

import BlogIcon from '@/assets/blog.svg';
import FacebookIcon from '@/assets/facebook.svg';
import InstagramIcon from '@/assets/instagram.svg';
import TwitterIcon from '@/assets/twitter.svg';

const Footer = (): ReactElement => {
  return (
    <footer className="footer">
      {/* 서비스 이용약관 및 정책 */}
      <ul className="footer-terms text-base text-small">
        <li className="footer-terms-item">왓챠피디아 서비스 이용 약관</li>
        <li className="footer-terms-item">개인정보 처리 방침</li>
        <li className="footer-terms-item">왓챠 서비스 이용 약관</li>
        <li className="footer-terms-item">청소년 보호정책</li>
        <li className="footer-terms-item">고객센터</li>
        <li className="footer-terms-item">채용정보</li>
      </ul>

      {/* 고객센터 및 연락처 정보 */}
      <ul className="footer-contact">
        <li className="footer-contact-item text-base text-medium">
          <span className="footer-contact-label">고객센터(이용 및 결제 문의)</span>
          <a href="mailto:cs@watcha.co.kr" className="footer-contact-link">
            cs@watcha.co.kr
          </a>
        </li>

        <li className="footer-contact-item text-base text-medium">
          <span className="footer-contact-label">광고 문의</span>
          <a href="mailto:ad-sales@watcha.com" className="footer-contact-link">
            ad-sales@watcha.com
          </a>
          <span className="footer-contact-link">02-515-9985 (유료)</span>
        </li>

        <li className="footer-contact-item text-base text-medium">
          <span className="footer-contact-label">제휴 및 대외 협력</span>
          <a
            href="https://watcha.team/contact"
            className="footer-contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://watcha.team/contact
          </a>
          <a href="#" className="footer-contact-link">
            최신 광고 소개서
          </a>
        </li>

        <li className="footer-contact-item text-base text-medium">
          <span className="footer-contact-label">B2B 구독권 구매 문의</span>
          <a href="mailto:jinu1005@coopnc.com" className="footer-contact-link">
            쿠프마케팅 (jinu1005@coopnc.com)
          </a>
        </li>

        <li className="footer-contact-item text-base text-medium">
          <span className="footer-contact-label">큐레이터</span>
          <a href="#" className="footer-contact-link">
            큐레이터 이용 가이드
          </a>
        </li>
      </ul>

      {/* 회사 정보 */}
      <div className="footer-company">
        <ul className="footer-company-list text-base text-medium">
          <li className="footer-company-item divider-element">주식회사 왓챠</li>
          <li className="footer-company-item divider-element">대표 박태훈</li>
          <li className="footer-company-item">서울특별시 서초구 강남대로 343 신덕빌딩 3층</li>
        </ul>

        <ul className="footer-company-list text-base text-medium">
          <li className="footer-company-item divider-element">사업자등록번호 211-88-66013</li>
          <li className="footer-company-item">통신판매업 신고번호 제 2019-서울서초-0965호</li>
        </ul>

        <ul className="footer-company-list text-base text-medium">
          <li className="footer-company-item">호스팅 서비스 제공자 아마존웹서비시즈코리아 유한회사</li>
        </ul>
      </div>

      {/* SNS 링크 */}
      <div className="footer-social">
        <a href="#" className="footer-social-link interactive-element" aria-label="Facebook">
          <FacebookIcon />
        </a>

        <a href="#" className="footer-social-link interactive-element" aria-label="Twitter">
          <TwitterIcon />
        </a>

        <a href="#" className="footer-social-link interactive-element" aria-label="Instagram">
          <InstagramIcon />
        </a>

        <a href="#" className="footer-social-link interactive-element" aria-label="Blog">
          <BlogIcon />
        </a>
      </div>

      {/* 저작권 정보 */}
      <div className="footer-copyright text-base text-medium">Copyright © 2025 by Watcha_clone_coding</div>
    </footer>
  );
};

export default Footer;
