def sign_in(user = nil)
  user ||= FactoryGirl.create(:user)
  visit '/'
  within '.sign-in' do
    fill_in 'user[email]', with: user.email
    fill_in 'user[password]', with: 'password'
  end
  click_on 'Log In'

  user
end

def log_out
  click_on 'Log Out'
  page.reset!
  visit '/'
end

def visit_user(user)
  full_name = "#{user.profile.first_name} #{user.profile.last_name}"
  fill_in 'search-bar', with: full_name
  click_link full_name
end
