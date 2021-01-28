--Create DB if not exists
IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'Contact')
BEGIN
    CREATE DATABASE Contact
END

USE Contact
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Use Contact
CREATE TABLE [dbo].[app_Contact_TB](
  ContactId			  int NOT NULL IDENTITY(1, 1),
  FirstName           varchar(80) NULL,
  LastName		      varchar(80) NULL,
  Email				  varchar(80) NULL,
  PhoneNumber		  numeric NULL,
  ContactStatus		  bit	NOT NULL DEFAULT 1,
  CreatedDate		  datetime NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ContactId)
) ON [PRIMARY]

GO

--DROP TABLE  [dbo].[app_Contact_TB]
--ALTER TABLE [dbo].[app_Contact_TB]
--ADD CONSTRAINT ContactId_PKEY PRIMARY KEY(ContactId)
 
INSERT INTO [dbo].[app_Contact_TB](FirstName,LastName,Email,PhoneNumber)
VALUES ( 'Triveni','Varma','triveni@gmail.com',232323)

select * from [dbo].[app_Contact_TB]