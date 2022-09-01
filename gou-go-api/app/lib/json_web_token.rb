class JsonWebToken
  SECRET_KEY = Rails.application.secrets.secret_key_base.to_s

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def self.decode(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  end

  def self.userJson(user)
    token = JsonWebToken.encode(user_id: user.id)
    time = Time.now + 24.hours.to_i
    {
      token: token,
      exp: time.strftime("%m-%d-%Y %H:%M"),
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_img_url: user.profile_img_url,
      address: user.address,
      is_sitter: user.is_sitter,
      created_at: user.created_at
    }
  end
end
