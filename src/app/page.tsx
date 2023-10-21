
import "server-only"
import { Form } from "./component/form/Form"
import { Table } from "./component/table/Table"
import styles from "./page.module.css";

export default async function Home() {

  return (
    <>
      <div className={styles.background}>
        <div className={styles.content}>
          <Form />
        </div>
      </div>
      <Table/>

    </>
  )
}

