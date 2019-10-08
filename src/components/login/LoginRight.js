import React from 'react';
import './LoginRight.css'

const LoginRight = props => {
    return (
        <div className="register-right">
        <div className="card">
          <div className="card--desc">
            <h2>Login</h2>
            <p>돈암동교회 청년부 주보앱 관리자 페이지입니다.</p><br />
          </div>
          <div className="card--register">
            <form id = "login-form" action="${pageContext.request.contextPath}/loginCheck" method = "post">
              <input type="text" name="id" placeholder="id" />
              <input type="password" name="pw" placeholder="password" />
              <input type="button" value="login" onClick = "document.getElementById('login-form').submit();"/>
            </form>
          </div>
          <div>
            <a href="#" class="policy">아이디찾기</a>	
            <a href="#" class="policy">비밀번호찾기</a>
          </div>
        </div>
      </div>
    );
};

export default LoginRight;