/**
 * Data model for user data service
 * @author Paolo Bianchini
 * @author Lorenzo Monaco
 */

// UserOptions
export interface UserOptions {
  /** first name of user */
  firstname?: string;
  /** last name of user */
  lastname?: string;
  /** email of user */
  username: string;
  /** pasword for user */
  password: string;
}
