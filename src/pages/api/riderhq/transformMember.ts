export type MemberData = {
  id: string;
  handle: string;
  member_is_user_bool: boolean;
  firstnames_txt: string;
  lastname_txt: string;
  email_eml: string;
  expiry_day: string;
  user?: {
    id?: string;
    handle?: string;
  };
};

export type Member = {
  memberId: string;
  userId: string | null;
  handle: string | null;
  isUser: boolean;
  firstnames: string;
  lastname: string;
  email: string | null;
  expires: string;
};

export const transformMember = (data: MemberData): Member => ({
  memberId: data.id,
  userId: data.user?.id || null,
  handle: data.user?.handle || null,
  isUser: data.member_is_user_bool,
  firstnames: data.firstnames_txt,
  lastname: data.lastname_txt,
  email: data.email_eml,
  expires: data.expiry_day,
});
