import React, { useState } from 'react';
import AcceptTermsComponent from  '../AcceptTerms/AcceptTerms';
import ChoosePackagePackageComponent from '../Step1/StepperChoosePackage'
import ConfigurationCreatorComponent from '../LinkCreation/ConfigurationCreator';
import { CarConfigurationType } from '../../../interfaces/models/carConfiguration';
import { Package, PackageType } from '../../../interfaces/models/package';
import StripeContainerComponent from '../PaymentMethod/StripeContainer';
import { CarType } from '../../../interfaces/models/car';
import { SelectedOptionType } from '../../../pages/DashBoard/Order/CreateOrder/CreateOrder';


export const handleRender = (activeStep:number, next: (answer: CarConfigurationType | Package  | null) => any, orderCreated: SelectedOptionType) => {

    
  switch(activeStep){
    case 0:
      return(
        <ChoosePackagePackageComponent next={next}/>
      )
    case 1: 
        return(
          <ConfigurationCreatorComponent type={orderCreated.package!.type}  next={next}></ConfigurationCreatorComponent>
        )
    case 2:
      return(
          <AcceptTermsComponent next={next}/>
      )
    case 3: 
        return(  
          <StripeContainerComponent selectedOptions={orderCreated} />
        )
    default:
      return(
        <div>
          
        </div>
      )
  }
}