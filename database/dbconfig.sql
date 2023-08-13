-- Criação da tabela categories

CREATE TABLE planner_database.categories (
	id INT UNSIGNED auto_increment NOT NULL,
	name varchar(70) NOT NULL,
	CONSTRAINT categories_PK PRIMARY KEY (id),
	CONSTRAINT categories_UN UNIQUE KEY (name)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- Criação da tabela tasks 

CREATE TABLE planner_database.tasks (
	id INT UNSIGNED auto_increment NOT NULL,
	category_id INT UNSIGNED NOT NULL,
	title varchar(100) NOT NULL,
	status varchar(100) NOT NULL,
	CONSTRAINT tasks_PK PRIMARY KEY (id),
	CONSTRAINT tasks_UN UNIQUE KEY (title),
	CONSTRAINT tasks_FK FOREIGN KEY (category_id) REFERENCES planner_database.categories(id) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
