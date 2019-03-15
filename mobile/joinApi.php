<?php
header("Content-type:text/html;charset=utf-8");
require 'vendor/autoload.php';
//Database Config
$config = array(
    'host'       => 'localhost',
    'user'       => 'root',
    'password'   => '123456',
    'database'   => 'cert_website_2016',

    // optional

    'fetchMode'  => \PDO::FETCH_ASSOC,
    'charset'    => 'utf8',
    'port'       => 3306,
    'unixSocket' => null,
);
$dbConn = new \Simplon\Mysql\Mysql(
    $config['host'],
    $config['user'],
    $config['password'],
    $config['database']
);
//Email

if ($_GET["act"] == "getDepart") {
	$result = $dbConn->FetchRowMany('SELECT id,department_name FROM wp_department WHERE flag=1 ORDER BY orders ASC');
	echo json_encode($result);
} elseif ($_GET["act"] == "join") {
	// 防xss，防空字符串
	$data["student_id"] = htmlspecialchars($_POST["student_id"]);
	$data["username"] = htmlspecialchars($_POST["username"]);
	$data["introduction"] = htmlspecialchars($_POST["introduction"]);
	$data["department_id"] = intval($_POST["department_id"]);
	$data["email"] = htmlspecialchars($_POST["email"]);
	$data["phone_number"] = htmlspecialchars($_POST["phone_number"]);
	$result = array('status' => false, 'msg' => '');
	if (empty($data["student_id"]) || empty($data["username"]) || empty($data["introduction"]) || empty($data["department_id"]) || empty($data["email"]) || empty($data["phone_number"])) {
		$result['msg'] = '错了！重填(╯‵□′)╯︵┻━┻';
	} else {
		// 验证部门id是否存在
		$is_exist = $dbConn->FetchRow('SELECT department_name FROM wp_department WHERE id=' . $data["department_id"]);
		if ($is_exist["department_name"]) {
			$data["create_time"] = date("Y-m-d H:i:s");
			$id = $dbConn->insert('wp_application', $data);
			if ($id) {
				$result['status'] = true;
				$contentData = array(
					'username' => $data["username"],
					'department_name' => $is_exist["department_name"],
				);
			} else {
				$result['msg'] = '提交失败！';
			}
		}
	}
	echo json_encode($result);
}